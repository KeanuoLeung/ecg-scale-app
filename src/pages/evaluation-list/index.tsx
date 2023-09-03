import React, { useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

import './index.css';
import { useHistory } from 'react-router';
import {
  IonActionSheet,
  IonLoading,
  IonPage,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from '@ionic/react';
import { db } from '../../db';
import { EcgDeviceContext } from '../../tools/ecg-plugin';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import base64ToFile from '../../tools/base64ToFile';
import {
  UserInfo,
  getList,
  saveHrvReport,
  saveOriginalCsv,
  saveReport,
} from '../../api';
import useEvaList from '../../api/useEvaList';
import { ReleaseType } from '../../constants/type';

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
  const [userName, setUserName] = useState('');
  const [evaluations, setEvalutions] = useState<Evaluation[]>([]);
  const {
    connectToDevice,
    debugMessages,
    deviceState,
    currentDeviceId,
    stopMonitor,
    cancelMonitor,
  } = useContext(EcgDeviceContext);

  const [userType, setUserType] = useState<'ADMIN' | 'USER'>('USER');
  const [disabledReports, setDisabledReports] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);

  const [opingEva, setOpingEva] = useState('');
  const [opingSettings, setOpingSettings] = useState(false);

  const [list, refresh] = useEvaList();

  useEffect(() => {
    if (!localStorage.getItem('endpoint')) {
      history.push('/settings');
    }
  }, []);

  const checkDisabled = async () => {
    const reportsToUpload = await db.reports.toArray();
    console.log('reportsToUpload', reportsToUpload, list);
    const result = [];
    const now = Date.now();
    console.log('all list', list);
    for (const scale of list) {
      if (
        scale.releaseType === ReleaseType.SINGLE &&
        reportsToUpload.some((report) => report.scaleUUId === scale.uuid)
      ) {
        result.push(scale.uuid ?? '');
      }

      if (
        new Date(scale.effectiveStartTime).valueOf() > now ||
        new Date(scale.effectiveEndTime).valueOf() < now
      ) {
        result.push(scale.uuid ?? '');
      }
    }
    console.log('disabled reports', disabledReports);
    setDisabledReports(result);
  };

  useIonViewDidEnter(() => {
    refresh();
    checkDisabled();
  });

  useEffect(() => {
    checkDisabled();
  }, [list]);

  useEffect(() => {
    // 定时同步
    async function sync() {
      const reports = (await db.reports.toArray()).filter(
        (resport) => !resport.synced
      );

      console.log('sync reports', reports);

      for (const report of reports) {
        const success = await saveReport({
          QuestionidAndAnsweridInput: report.evaReport,
          scaleUUid: report.scaleUUId,
          realname: report.realName ?? '',
          phone: report.phone ?? '',
          uuid: report.uuid ?? '',
        });
        if (success) {
          report.id && db.reports.update(report.id, { synced: true });
        }
        // 心电数据
        report.originalEcgData &&
          saveOriginalCsv({
            time: Date.now(),
            userId: String(report.userId),
            scaleId: report.scaleUUId,
            uuid: report.uuid ?? '',
            type: 'originalEcgData',
            value: report.originalEcgData,
          });
        // 心率数据
        report.chDetectionResult &&
          saveOriginalCsv({
            time: Date.now(),
            userId: String(report.userId),
            scaleId: report.scaleUUId,
            uuid: report.uuid ?? '',
            type: 'chDetectionResult',
            value: report.chDetectionResult,
          });
        // report
        report.hrvReport &&
          saveHrvReport({
            ...report.hrvReport,
            scaleUUid: report.scaleUUId,
            uuid: report.uuid ?? '',
            userId: report.userId,
          });
      }
    }
    sync();
    setInterval(() => {
      sync();
    }, 10 * 1000);

    localforage.getItem<UserInfo>('user').then((res) => {
      setUserName(res?.user?.realname ?? '用户');
      console.log('user', res?.user);
      setUserType((res?.role as any) ?? 'ADMIN');
    });
  }, []);

  console.log('disabled reports', disabledReports);
  console.log('eva list', list);
  return (
    <IonPage style={{ overflow: 'scroll' }}>
      <IonActionSheet
        header="是否连接心电仪测试"
        mode="ios"
        isOpen={Boolean(opingEva)}
        onDidDismiss={() => {
          setOpingEva('');
        }}
        buttons={[
          {
            text: '否',
            role: 'destructive',
            data: {
              action: 'withoutEcg',
            },
            handler: () => {
              history.push(`/eva-detail?uuid=${opingEva}`);
            },
          },
          {
            text: '是',
            data: {
              action: 'withEcg',
            },
            handler: async () => {
              // 连接心电仪，展示个loading界面
              setConnecting(true);
              const timer = setTimeout(() => {
                cancelMonitor();
                alert('连接失败，请重启APP');
                setConnecting(false);
              }, 30000);
              try {
                const result = await connectToDevice();
                if (result) {
                  history.push(`/eva-detail?uuid=${opingEva}`);
                  setConnecting(false);
                  clearTimeout(timer);
                }
              } catch (e) {
                cancelMonitor();
                alert('连接失败，请重启APP');
                setConnecting(false);
              }
            },
          },
        ]}
      ></IonActionSheet>
      <IonActionSheet
        header="更多操作"
        mode="ios"
        isOpen={opingSettings}
        onDidDismiss={() => {
          setOpingSettings(false);
        }}
        buttons={[
          {
            text: '设置服务器地址',
            data: {
              action: 'withoutEcg',
            },
            handler: () => {
              history.push('/settings');
            },
          },
          {
            text: '刷新页面',
            data: {
              action: 'refresh',
            },
            handler: () => {
              refresh();
              checkDisabled();
              // TODO: toast
            },
          },
          {
            text: '同步状态',
            data: {
              action: 'sync-list',
            },
            handler: () => {
              // TODO: toast
              history.push('/sync-list');
            },
          },
          {
            text: '退出登录',
            role: 'destructive',
            data: {
              action: 'withoutEcg',
            },
            handler: () => {
              localStorage.setItem('token', '');
              location.href = '/login';
            },
          },
        ]}
      ></IonActionSheet>
      <IonLoading
        mode="ios"
        message="正在连接设备，请确保设备处于打开状态..."
        isOpen={connecting}
      ></IonLoading>
      <div className="list">
        <div className="list-title">
          <span>🌞 欢迎您，{userName}</span>
          <span
            onClick={() => {
              setOpingSettings(true);
            }}
          >
            ⚙️
          </span>
        </div>
        {/* <div id="reader" style={{ width: 600, display: 'none' }}></div> */}
        <div className="list-subtitle">请选择量表开始测试</div>
        {/* {debugMessages.map((msg) => (
          <div key={msg} className="list-subtitle">
            {msg}
          </div>
        ))} */}
        {list.map((evaluation) => (
          <div
            className={`list-card ${
              disabledReports.includes(evaluation.uuid ?? '?') && 'disabled'
            }`}
            key={evaluation.uuid}
            onClick={() => {
              if (disabledReports.includes(evaluation.uuid ?? '?')) {
                alert('量表已失效');
                return;
              }
              setOpingEva(evaluation.uuid ?? '');
              // history.push('/eva-detail');
            }}
          >
            <div>{evaluation.scaleName}</div>
            {userType === 'ADMIN' && (
              <div className="list-card-date">
                创建于：{new Date(evaluation.createdAt).toLocaleString()}
              </div>
            )}
            {userType === 'USER' && (
              <>
                <div className="list-card-date">
                  开始：
                  {new Date(evaluation.effectiveStartTime).toLocaleString()}
                </div>
                <div className="list-card-date">
                  结束：{new Date(evaluation.effectiveEndTime).toLocaleString()}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </IonPage>
  );
}

export default EvaluationList;
