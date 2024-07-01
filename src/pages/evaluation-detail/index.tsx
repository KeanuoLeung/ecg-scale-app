import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import './index.css';
import { IonPage, useIonToast, useIonViewDidLeave } from '@ionic/react';
import {
  EcgDeviceContext,
  EcgRawData,
  EcgResult,
  HrvReport,
} from '../../tools/ecg-plugin';
import { useHistory } from 'react-router';
import { v4 as uuid } from 'uuid';
import localforage from 'localforage';
import useEvaList from '../../api/useEvaList';
import { UserInfo, saveReport } from '../../api';
import { db } from '../../db';
import makeArrayCsv from '../../tools/makeArrayCsv';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

enum QuestionType {
  Single = 1,
  Multiple = 2,
  Blank = 3,
  Image = 5,
}

const QuestionTypeTitle = {
  [QuestionType.Single]: '单选题',
  [QuestionType.Multiple]: '多选题',
  [QuestionType.Blank]: '填空题',
  [QuestionType.Image]: '图片题',
};

function EvaluationDetail() {
  const [id, setId] = useState<number>(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answerMap, setAnswerMap] = useState<
    Record<number, number | number[] | string>
  >({});
  const ansRef = useRef<Record<number, number | number[] | string>>({});
  const barRef = useRef<HTMLDivElement>(null);
  const scaleId = new URLSearchParams(location.search).get('uuid');
  const [evaList] = useEvaList();
  const [skipRuleStr, setSkipRuleStr] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [userchecked, setUserchecked] = useState(false);
  const [userType, setUserType] = useState<'ADMIN' | 'USER'>('ADMIN');
  const [extra, setExtra] = useState({
    departmentEvaluationId: null,
    individualEvaluationId: null,
    test_uuid: null,
    uuid: '',
    title: '',
  });
  const [gender, setGender] = useState<0 | 1 | null>(null);
  const [identificationCard, setIdentificationCard] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [unit, setUnit] = useState('');
  const {
    connectToDevice,
    debugMessages,
    deviceState,
    currentDeviceId,
    stopMonitor,
    cancelMonitor,
    addReportUUIDs,
  } = useContext(EcgDeviceContext);

  useEffect(() => {
    localforage.getItem<UserInfo>('user').then((res) => {
      setUserType((res?.role as any) ?? 'ADMIN');
    });
  }, []);

  useEffect(() => {
    if (userType === 'USER') setUserchecked(true);
  }, [userType]);

  useEffect(() => {
    const curEva = evaList.find((item) => item.uuid === scaleId);
    if (curEva?.isSkip && curEva?.skipRule) {
      setSkipRuleStr(curEva.skipRule);
    }
  }, [evaList]);

  const skipRule = useMemo(() => {
    const rawRules = skipRuleStr.split('|');
    if (!questions.length) return [];
    try {
      console.log('raw rules', rawRules);
      const finalRules = rawRules.map((raw) => {
        console.log('errerr', raw);
        const RE = /(?<when>\d+)-(?<select>[A-Za-z])-(?<to>\d+|end)/;
        const { when, select, to } = RE.exec(raw)?.groups ?? {};
        const selectIdx = select.toUpperCase().charCodeAt(0) - 65;
        const rule = {
          whenIdx: Number(when) - 1, // 改成正常的 idx
          selectIdx, // A to 0
          select: questions[Number(when) - 1].answer[selectIdx]?.id,
          toIdx: to === 'end' ? questions.length : Number(to) - 1,
        };
        return rule;
      });
      return finalRules;
    } catch (e) {
      console.log('errerr', e);
      return [];
    }
  }, [skipRuleStr, questions]);

  const skipedQuestions = useMemo(() => {
    const finalQuestions = [];
    for (let idx = 0; idx < questions.length; idx++) {
      const question = questions[idx];
      finalQuestions.push(question);
      if (question.type === QuestionType.Single) {
        // 泽洋说只有单选题会skip，如果后边改了，泽洋来改
        if (answerMap[question.id] !== undefined) {
          // 如果这道题选了，才可能触发跳题逻辑
          const rule = skipRule?.find((rule) => rule.whenIdx === idx); // 泽洋说一道题只会配置一个skip rule
          if (rule && answerMap[question.id] === rule.select) {
            idx = rule.toIdx - 1;
          }
        }
      }
    }
    return finalQuestions;
  }, [questions, skipRule, answerMap]);

  console.log('skip rule str', {
    skipRuleStr,
    skipRule,
    skipedQuestions,
    questions,
  });

  useEffect(() => {
    // setQuestions(BLANK_QUESTIONS);
    async function run() {
      const questions: any = await localforage.getItem(`scale-${scaleId}`);
      console.log('questions', questions);
      const details: any[] = (await localforage.getItem('evaList')) ?? [];
      const detail = details.find((item) => item.test_uuid === scaleId);
      console.log('cur scale detail', detail);

      const res = await localforage.getItem<UserInfo>('user');
      const realUserName = res?.user?.username ?? '-';
      setExtra({
        individualEvaluationId: detail.individualEvaluationId,
        departmentEvaluationId: detail.departmentEvaluationId,
        test_uuid: detail.test_uuid,
        uuid: detail.uuid,
        title: `${realUserName}-${detail.scaleName}`,
      });
      setQuestions(
        questions?.ScaleQuestionRender?.map?.((question: any, idx: number) => ({
          ...question,
          idx,
        })) ?? ([] as any[])
      );
      setId(questions.id);
    }
    run();
  }, []);

  function generateQuestionAnswers() {
    const result = [];
    for (const question of skipedQuestions) {
      const { id: questionId, type } = question;
      switch (type) {
        case QuestionType.Single:
          result.push({
            type,
            questionId,
            id: answerMap[questionId] as number,
          });
          break;
        case QuestionType.Multiple:
          for (const answer of (answerMap[questionId] as number[]) ?? []) {
            result.push({ type, questionId, id: answer });
          }
          break;
        case QuestionType.Image:
          result.push({
            type,
            questionId,
            id: answerMap[questionId] as number,
          });
          break;
        case QuestionType.Blank:
          result.push({
            type,
            questionId,
            customAnswer: answerMap[questionId] as string,
          });
          break;
        default:
      }
    }

    return result;
  }

  generateQuestionAnswers();

  const [present] = useIonToast();

  const next = async (question: any, idx: any, arr: any[]) => {
    // check first

    if (ansRef.current[question.id] === undefined) {
      alert('请先作答此题目。');
      return;
    }
    // let result: {
    //   ecgRawDatas: EcgRawData[];
    //   ecgResults: EcgResult[];
    //   hrvReport?: HrvReport | undefined;
    // } | null = null;
    if (idx === arr.length - 1) {
      const firstNot = skipedQuestions.findIndex(
        (question) => !answerMap[question.id]
      );
      if (firstNot !== -1) {
        alert('请作答所有题目');
        scrollToNext(firstNot);
        return;
      }
      // try {
      //   if (deviceState === 'online') {
      //     result = await stopMonitor();
      //     // 上报心电数据
      //
      //   }
      // } catch (e) {
      //   present({
      //     message: '请稍等，我们还没有收集到足够的心电数据',
      //     duration: 1500,
      //     position: 'top',
      //   });
      //   return;
      //
      // }

      const answers = generateQuestionAnswers();
      const _uuid = uuid();
      addReportUUIDs(_uuid);
      db.reports.add({
        scaleUUId: extra.uuid ?? '',
        userId:
          Number((await localforage.getItem<UserInfo>('user'))?.user?.id) ?? 0,
        evaReport: answers,
        // originalEcgData: makeArrayCsv(result?.ecgRawDatas ?? []),
        // chDetectionResult: makeArrayCsv(result?.ecgResults ?? []),
        // hrvReport: result?.hrvReport,
        originalEcgData: '',
        chDetectionResult: '',
        //  hrvReport: result?.hrvReport,
        timestamp: Date.now(),
        realName: username,
        phone: phone,
        gender: gender as number,
        identificationCard,
        age: age as number,
        unit,
        ...extra,
      });
      history.back();
      // id &&saveReport({
      //   QuestionidAndAnsweridInput: answers,
      //   scaleId: id,
      // });
    } else {
      scrollToNext(idx + 1);
    }
  };

  const renderSingleSelect = (question: any, idx: any, arr: any[]) =>
    question?.answer?.map((answer: any) => (
      <div
        className={`question-item${
          answerMap[question?.id] === answer?.id ? ' checkedrow' : ''
        }`}
        key={answer?.id}
        onTouchEnd={() => {
          setAnswerMap((am) => {
            const a = { ...am, [question.id]: answer.id };
            ansRef.current = a;
            return a;
          });

          if (idx !== skipedQuestions.length - 1) {
            setTimeout(() => {
              next(question, idx, arr);
            }, 50);
          }
        }}
      >
        <input
          type="radio"
          className="option-input radio"
          onChange={() => void 0}
          checked={answerMap[question?.id] === answer?.id}
        />
        {answer?.name}
      </div>
    ));

  const renderImageSelect = (question: any) =>
    question?.answer?.map((answer: any) => (
      <div
        className={`question-item-image${
          answerMap[question?.id] === answer?.id ? ' checkedrow' : ''
        }`}
        key={answer?.id}
        onTouchEnd={() =>
          setAnswerMap((am) => {
            const a = { ...am, [question.id]: answer.id };
            ansRef.current = a;
            return a;
          })
        }
      >
        <input
          type="radio"
          className="option-input radio"
          onChange={() => void 0}
          checked={answerMap[question?.id] === answer?.id}
        />
        {answer?.name}
        <img src={answer?.picture} style={{ marginLeft: 12 }} />
      </div>
    ));

  // useIonViewDidLeave(() => {
  //   if (deviceState === 'online') {
  //     cancelMonitor();
  //   }
  // });

  const renderMultiSelect = (question: any) =>
    question?.answer?.map((answer: any) => (
      <div
        className={`question-item${
          Array.isArray(answerMap[question?.id]) &&
          (answerMap[question?.id] as number[])?.includes(answer.id)
            ? ' checkedrow'
            : ''
        }`}
        key={answer?.id}
        onTouchEnd={() => {
          let selected: number[] = (answerMap[question.id] as number[]) ?? [];
          selected = selected.includes(answer.id)
            ? selected.filter((i) => i !== answer.id)
            : [...selected, answer.id];
          setAnswerMap((am) => {
            const a = { ...am, [question.id]: selected };
            ansRef.current = a;
            return a;
          });
        }}
      >
        <input
          type="checkbox"
          className={'option-input checkbox'}
          onChange={() => void 0}
          checked={
            Array.isArray(answerMap[question?.id]) &&
            (answerMap[question?.id] as number[])?.includes(answer.id)
          }
        />
        {answer?.name}
      </div>
    ));

  const renderBlank = (question: any) => (
    <div>
      <input
        className="question-item-input"
        value={String(answerMap[question.id] ?? '')}
        onChange={(e) =>
          setAnswerMap((am) => {
            const a = { ...am, [question.id]: e.target.value };
            ansRef.current = a;
            return a;
          })
        }
      />
    </div>
  );

  const scrollToNext = (idx: number) => {
    const nextId = `#question-${idx}`;
    const nextBox = document?.querySelector(nextId)?.getBoundingClientRect();
    const con = document.querySelector('#question-con');

    if (!con) return;
    con?.scrollTo({
      top: (con?.scrollTop ?? 0) + (nextBox?.top ?? 0) - 20,
      behavior: 'smooth',
    });
  };

  const userInfo = (
    <div>
      <div
        className="detail"
        id="question-con"
        onScroll={(e) => {
          const progress =
            (e.target as any).scrollTop /
            ((e.target as any).scrollHeight - window.innerHeight);
          const vh = Math.round(progress * 100);
          barRef.current && (barRef.current.style.height = `${vh}vh`);
        }}
      >
        <div className="detail-card-container">
          <div className="detail-card">
            <div className="question-type">信息录入</div>
            <div className="detail-title">请输入受试者的个人信息</div>
            <div style={{ marginTop: 12 }}>
              <TextField
                id="standard-basic"
                label="受试者姓名"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <TextField
                id="standard-basic"
                label="受试者手机号"
                variant="standard"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  性别
                </FormLabel>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e: any) => {
                    setGender(e.target.value);
                  }}
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value={0} control={<Radio />} label="男" />
                  <FormControlLabel value={1} control={<Radio />} label="女" />
                </RadioGroup>
              </FormControl>
            </div>
            <div style={{ marginTop: 2 }}>
              <TextField
                id="standard-basic"
                label="年龄"
                variant="standard"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value as any)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <TextField
                id="standard-basic"
                label="证件号"
                variant="standard"
                value={identificationCard}
                onChange={(e) => setIdentificationCard(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <TextField
                id="standard-basic"
                label="单位"
                variant="standard"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="question-spacer"></div>
            <div
              className="next-question"
              onClick={() => {
                if (!username) {
                  alert('请先填写受试者姓名');
                  return;
                }
                if (!phone) {
                  alert('请先填写受试者手机号');
                  return;
                }
                if (gender === null) {
                  alert('请先填写性别');
                  return;
                }
                if (!identificationCard) {
                  alert('请先填写身份证号');
                  return;
                }
                if (age === null) {
                  alert('请先填写性别');
                  return;
                }
                if (!unit) {
                  alert('请先填写单位');
                  return;
                }
                setUserchecked(true);
              }}
            >
              确认用户
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const detail = (
    <div>
      <div className="progress-bar" ref={barRef}></div>
      <div className="total">总题数：{skipedQuestions.length}题</div>
      <div
        className="detail"
        id="question-con"
        onScroll={(e) => {
          const progress =
            (e.target as any).scrollTop /
            ((e.target as any).scrollHeight - window.innerHeight);
          const vh = Math.round(progress * 100);
          barRef.current && (barRef.current.style.width = `${vh}vw`);
        }}
      >
        {skipedQuestions.map((question, idx, arr) => (
          <div
            className="detail-card-container"
            key={question.id}
            id={`question-${idx}`}
          >
            <div className="detail-card">
              <div className="question-type">
                {QuestionTypeTitle[question.type as QuestionType]}
              </div>
              <div className="detail-title">
                {question.idx + 1}.{question.name}
              </div>
              {question.questionImg && (
                <img
                  style={{ borderRadius: 30, marginBottom: 24 }}
                  src={question.questionImg}
                />
              )}
              {question.type === QuestionType.Single &&
                renderSingleSelect(question, idx, arr)}
              {question.type === QuestionType.Multiple &&
                renderMultiSelect(question)}
              {question.type === QuestionType.Image &&
                renderImageSelect(question)}
              {question.type === QuestionType.Blank && renderBlank(question)}
              <div className="question-spacer"></div>
              <div
                className="next-question"
                onClick={() => {
                  next(question, idx, arr);
                }}
              >
                {idx === arr.length - 1 ? '提交问卷' : '下一题'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <IonPage>{userchecked ? detail : userInfo}</IonPage>;
}

export default EvaluationDetail;
