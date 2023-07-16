import React, { useEffect, useState } from 'react';
import localforage from 'localforage';

import './index.css';
import { useHistory } from 'react-router';
import { IonPage } from '@ionic/react';

type Evaluation = {
  scaleName: string;
  uuid: string;
  createdAt: string;
  isTest: boolean;
  releaseType: number;
  effectiveStartTime: string;
  effectiveEndTime: string;
  isEnable: boolean;
};

function EvaluationList() {
  const history = useHistory();
  const [evaluations, setEvalutions] = useState<Evaluation[]>([]);

  useEffect(() => {
    const testEvaluations = [
      {
        scaleName: '生活事件量表（LES）',
        uuid: 'f54d554a-f7b1-43ee-83a5-7b833bea8941',
        createdAt: '2023-07-15T07:41:48.431Z',
        isTest: false,
        releaseType: 2,
        effectiveStartTime: '2023-07-14T16:00:00.000Z',
        effectiveEndTime: '2023-07-17T16:00:00.000Z',
        isEnable: true,
      },
      {
        scaleName: '测试多选量表',
        uuid: '7b7ee3ee-f836-441e-b0f3-aaf64cfbd269',
        createdAt: '2023-07-16T07:47:14.345Z',
        isTest: true,
        releaseType: 2,
        effectiveStartTime: '2023-07-15T16:00:00.544Z',
        effectiveEndTime: '2023-07-30T16:00:00.000Z',
        isEnable: true,
      },
      {
        scaleName: '测试填空量表',
        uuid: '8c2661ab-8927-4ae6-a4f0-daa489655e11',
        createdAt: '2023-07-16T07:47:39.484Z',
        isTest: false,
        releaseType: 2,
        effectiveStartTime: '2023-07-15T16:00:00.317Z',
        effectiveEndTime: '2023-07-30T16:00:00.000Z',
        isEnable: true,
      },
    ];
    setEvalutions(testEvaluations);
    localforage.setItem('evaluations', testEvaluations);
    localforage.getItem('evaluations').then((res) => {
      console.log('result', res);
    });
  }, []);
  return (
    <IonPage>
      <div className="list">
        <div className="list-title">🌞 欢迎您，user22</div>
        <div className="list-subtitle">请选择量表开始测试</div>
        {evaluations.map((evaluation) => (
          <div
            className="list-card"
            key={evaluation.uuid}
            onClick={() => {
              history.push('/eva-detail');
            }}
          >
            <div>{evaluation.scaleName}</div>
            <div className="list-card-date">创建于：{evaluation.createdAt}</div>
          </div>
        ))}
      </div>
    </IonPage>
  );
}

export default EvaluationList;
