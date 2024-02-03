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
import { v4 as uuid } from 'uuid';
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
  const [realusername, setRealusername] = useState('');
  const [opingSettings, setOpingSettings] = useState(false);

  const [list, refresh] = useEvaList();

  useEffect(() => {
    if (!localStorage.getItem('endpoint')) {
      history.push('/settings');
    }
  }, []);

  const checkDisabled = async () => {
    const reportsToUpload = await db.reports.toArray();

    const result = [];
    const now = Date.now();

    for (const scale of list) {
      if (
        scale.releaseType === ReleaseType.SINGLE &&
        reportsToUpload.some((report) => {
          if (report.test_uuid === scale.test_uuid) {
            return true;
          }

          return false;
        })
      ) {
        result.push(scale.test_uuid ?? 'Ï');
      }

      if (
        new Date(scale.effectiveStartTime).valueOf() > now ||
        new Date(scale.effectiveEndTime).valueOf() < now
      ) {
        result.push(scale.uuid ?? '');
      }
    }

    setDisabledReports(result);
  };

  useIonViewDidEnter(() => {
    refresh();
    checkDisabled();
  });

  useEffect(() => {
    const re = setInterval(() => {
      refresh();
    }, 10000);
    return () => {
      clearInterval(re);
    };
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [list]);

  useEffect(() => {
    let syncing = false;
    // 定时同步
    async function sync() {
      if (syncing) {
        return;
      }
      syncing = true;
      const reports = (await db.reports.toArray()).filter(
        (resport) => !resport.synced
      );

      const ecgs = (await db.ecgRecords.toArray()).filter((ecg) => !ecg.synced);

      for (const report of reports) {
        const success = await saveReport({
          QuestionidAndAnsweridInput: report.evaReport,
          scaleUUid: report.scaleUUId,
          realname: report.realName ?? '',
          phone: report.phone ?? '',
          uuid: report.uuid ?? '',
          departmentEvaluationId: report.departmentEvaluationId,
          individualEvaluationId: report.individualEvaluationId,
        });

        if (success) {
          report.id && db.reports.update(report.id, { synced: true });
        }
      }

      for (const ecg of ecgs) {
        const {
          id,
          originalEcgData,
          chDetectionResult,
          hrvReport,
          userId,
          reportUUIDList,
        } = ecg;
        // 心电数据
        if (originalEcgData && chDetectionResult && hrvReport) {
          const _uuid = uuid();
          console.log('[syncing ecg]', {
            originalEcgData,
            chDetectionResult,
            hrvReport,
          });
          await saveOriginalCsv({
            time: Date.now(),
            userId: String(userId),
            scaleId: '',
            uuid: _uuid,
            type: 'originalEcgData',
            value: originalEcgData,
            reportUUIDList: reportUUIDList ?? [],
          });
          await saveOriginalCsv({
            time: Date.now(),
            userId: String(userId),
            scaleId: '',
            uuid: _uuid,
            type: 'chDetectionResult',
            value: chDetectionResult,
            reportUUIDList: reportUUIDList ?? [],
          });
          await saveHrvReport({
            ...hrvReport,
            reportUuidList: reportUUIDList ?? [],
            uuid: _uuid,
            userId: userId,
          });
          id && db.ecgRecords.update(id, { synced: true });
        }
      }
      syncing = false;
    }
    sync();
    setInterval(() => {
      sync();
    }, 10 * 1000);

    (window as any).sync = sync;

    localforage.getItem<UserInfo>('user').then((res) => {
      setUserName(res?.user?.realname ?? '用户');
      setRealusername(res?.user?.username ?? '-');
      setUserType((res?.role as any) ?? 'ADMIN');
    });
  }, []);

  console.log('evas', list);

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
              // setConnecting(true);
              try {
                const result = await connectToDevice();
                if (result) {
                  history.push(`/eva-detail?uuid=${opingEva}`);
                  // setConnecting(false);
                  // clearTimeout(timer);
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
            text: '设置测试时间',
            data: {
              action: 'time-set',
            },
            handler: () => {
              // TODO: toast
              history.push('/time-set');
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
        <div className="list-subtitle" style={{ marginBottom: 2 }}>
          用户名：{realusername}
        </div>
        <div className="list-subtitle">请选择量表开始测试</div>

        {/* {debugMessages.map((msg) => (
          <div key={msg} className="list-subtitle">
            {msg}
          </div>
        ))} */}
        <div
          className={`list-card`}
          onClick={() => {
            // history.push('/eva-detail');
          }}
        >
          <div
            onClick={async () => {
              const result = await connectToDevice();
              if (result) {
                history.push('/ecg-only');
              }
            }}
          >
            ❤️ 进行心率变异性测试
          </div>
        </div>
        <div className="divider"></div>
        <div className="list-subtitle" style={{ marginBottom: 5 }}>
          个人量表
        </div>
        {list
          .filter((item) => item.type === 'individual')
          .map((evaluation) => (
            <div
              className={`list-card ${
                (disabledReports.includes(
                  String(evaluation.test_uuid) ?? 'xxxx'
                ) || evaluation.isTest) && 'disabled'
              }`}
              key={evaluation.uuid}
              onClick={() => {
                if (disabledReports.includes(evaluation.uuid ?? '?')) {
                  alert('量表已失效');
                  return;
                }
                if (deviceState !== 'online') {
                  setOpingEva(evaluation.uuid ?? '');
                } else {
                  history.push(`/eva-detail?uuid=${evaluation.uuid}`);
                }
                // history.push('/eva-detail');
              }}
            >
              <div>
                {evaluation.scaleName}
                {disabledReports.includes(evaluation.uuid ?? '?')
                  ? '(已做完)'
                  : ''}
              </div>
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
                    结束：
                    {new Date(evaluation.effectiveEndTime).toLocaleString()}
                  </div>
                </>
              )}
            </div>
          ))}
        <div className="divider"></div>
        <div className="list-subtitle" style={{ marginBottom: 5 }}>
          团体量表
        </div>
        {list
          .filter((item) => item.type === 'department')
          .map((evaluation) => (
            <div
              className={`list-card ${
                (disabledReports.includes(
                  String(evaluation.individualEvaluationId) ?? 'xxxx'
                ) ||
                  disabledReports.includes(
                    String(evaluation.departmentEvaluationId) ?? 'xxxx'
                  )) &&
                'disabled'
              }`}
              key={evaluation.uuid}
              onClick={() => {
                if (disabledReports.includes(evaluation.uuid ?? '?')) {
                  alert('量表已失效');
                  return;
                }
                if (deviceState !== 'online') {
                  setOpingEva(evaluation.uuid ?? '');
                } else {
                  history.push(`/eva-detail?uuid=${evaluation.uuid}`);
                }
                // history.push('/eva-detail');
              }}
            >
              <div>
                {evaluation.scaleName}
                {disabledReports.includes(evaluation.uuid ?? '?')
                  ? '(已做完)'
                  : ''}
              </div>
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
                    结束：
                    {new Date(evaluation.effectiveEndTime).toLocaleString()}
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
