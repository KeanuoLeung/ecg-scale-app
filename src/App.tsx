import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonModal,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonLoading,
  useIonToast,
  IonAlert,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './app.css';

/* Theme variables */
import './theme/variables.css';
import EvaluationList from './pages/evaluation-list';
import EvaluationDetail from './pages/evaluation-detail';
import EcgPlugin, {
  Device,
  EcgDevice,
  EcgDeviceContext,
  EcgRawData,
  EcgResult,
} from './tools/ecg-plugin';
import Settings from './pages/settings';
import demo from './constants/demo';
import makeArrayCsv from './tools/makeArrayCsv';
import Login from './pages/login';
import SyncList from './pages/sync-list';
import EcgOnly from './pages/ecg-only';
import { db } from './db';
import localforage from 'localforage';
import { UserInfo } from './api';
import TimeSet from './pages/time-set';

setupIonicReact();

// let ecgRawDatas: EcgRawData[] = demo.ecgRawDatas;
// let ecgResults: EcgResult[] = demo.ecgResults;
let ecgRawDatas: EcgRawData[] = [];
let ecgResults: EcgResult[] = [];
(window as any).ecgRawDatas = ecgRawDatas;
(window as any).rawPoints = [];

(window as any).db = db;

(window as any).heart = '-';

let dontShowAlert = false;

let i: any;

let cancelTimer: any;

function showAlert() {
  if (dontShowAlert) {
    return;
  }
  alert('心电贴已断开');
  location.href = '/';
  window.history.replaceState(null, '', '/');
  dontShowAlert = true;
  clearTimeout(i);
  i = setTimeout(() => {
    dontShowAlert = false;
  }, 5000);
}

let heartRateGet = false;

const App: React.FC = () => {
  const [deviceState, setDeviceState] =
    useState<EcgDevice['deviceState']>('offline');
  const [currentDeviceId, setCurrentDeviceId] =
    useState<EcgDevice['currentDeviceId']>('');
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  const [deviceList, setDeviceList] = useState<Device['devices']>([]);
  const [showDeviceList, setShowDeviceList] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectedTimestamp, setConnectedTimestamp] = useState(0);
  const [timeShow, setTimeShow] = useState('00:00');
  const [reportUUIDs, setReportUUIDs] = useState<string[]>([]);
  const [showCancel, setShowCancel] = useState(false);
  const [heartRate, setHeartRate] = useState('-');
  const [nearRawDatas, setNearRawDatas] = useState<EcgRawData[]>([]);
  const [curShowPid, setCurShowPid] = useState('');
  const [battery, setBattery] = useState<Record<string, number>>({});
  const [red, setRed] = useState(false);
  const [isExitShow, setIsExitShow] = useState(false);

  function log(str: string) {
    setDebugMessages((msgs) => [...msgs.slice(0, 10), str]);
  }

  function startScan() {
    EcgPlugin.startScan({ time: -1 });
  }

  useEffect(() => {
    EcgPlugin.addListener('ecgDeviceFound', (data) => {
      // 连接搜索到的第一个心电设备
      setDeviceList(data.devices);
    });
    startScan();
    startScan();
  }, []);

  function monitorDevice(pid: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let connected = false;
      heartRateGet = false;
      log('connect to device');
      EcgPlugin.connect({ pid });
      EcgPlugin.addListener('connected', (data) => {
        log('device connected');
        if (data.success && !connected) {
          connected = true;
          setCurrentDeviceId(pid);
          setConnectedTimestamp(Date.now());
          setDeviceState('online');
          // 开始监测
          EcgPlugin.startMonitor({ pid });
          resolve(true);
        }
      });
      EcgPlugin.addListener('battery', (data) => {
        console.log('battery', data);
        // setBattery((batt) => ({ ...batt, [data.pid]: data.battery }));
      });
      EcgPlugin.addListener('ecgRawData', (data) => {
        ecgRawDatas.push(data);
        if (ecgResults.length && heartRateGet) {
          (window as any).rawPoints.push(...data.data);
        }

        // fetch('http://192.168.1.103:3000/log', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ key: 'ecgRawData', value: data }),
        // });
      });
      let beforeHeartRate = -1;
      let beforeHeartTime = Date.now();
      EcgPlugin.addListener('heartRate', (data) => {
        const rate = data.heartRate;
        heartRateGet = true;
        console.log('heart rate', data, rate, beforeHeartRate);
        setHeartRate(data.heartRate > 0 ? String(data.heartRate) : '-');
        (window as any).heart =
          data.heartRate > 0 ? String(data.heartRate) : '-';

        if (Date.now() - beforeHeartTime > 1000 * 3 && rate > -1) {
          if (Math.abs(rate - beforeHeartRate) > 5 && beforeHeartRate > -1) {
            setRed(true);
          } else {
            setRed(false);
          }
          if (rate >= 135 || rate <= 60) {
            setRed(true);
          }
          beforeHeartRate = rate;
          beforeHeartTime = Date.now();
        }
      });
      EcgPlugin.addListener('dis', () => {
        showAlert();
      });
      EcgPlugin.addListener('ecgResult', (data) => {
        ecgResults.push(data);
        console.log('ecg results', ecgResults);
        // fetch('http://192.168.1.103:3000/log', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ key: 'ecgResult', value: data }),
        // });
      });
    });
  }

  function connectToDevice(): Promise<true> {
    return new Promise((resolve) => {
      setShowDeviceList(false);
      setTimeout(() => {
        setShowDeviceList(true);
      }, 300);
      const listener = (e: any) => {
        setConnecting(true);
        setCurShowPid(e.value.pid);
        monitorDevice(e.value.pid).then((res) => {
          setConnecting(false);
          setShowDeviceList(false);
          resolve(true);
        });
        window.removeEventListener('device-selected', listener);
      };
      window.addEventListener('device-selected', listener);
    });
  }

  function cancelMonitor() {
    EcgPlugin.stopMonitor({ pid: currentDeviceId });
    EcgPlugin.removeAllListeners();
    setCurrentDeviceId('');
    setDeviceState('offline');
    ecgRawDatas = [];
    ecgResults = [];
  }

  useEffect(() => {
    const timer = setInterval(() => {
      deviceState === 'online' &&
        setTimeShow(
          `${String(
            new Date(Date.now() - connectedTimestamp).getUTCMinutes()
          ).padStart(2, '0')}:${String(
            new Date(Date.now() - connectedTimestamp).getUTCSeconds()
          ).padStart(2, '0')}`
        );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [connectedTimestamp, deviceState]);

  async function stopMonitor() {
    const _ecgRawDatas = [...ecgRawDatas];
    const _ecgResults = [...ecgResults];
    const hrvReport = await EcgPlugin.analysisHrv({
      intervalList: _ecgResults.map((result) => result.rrInterval),
      beatList: _ecgResults.map((result) => result.beatType),
    });
    EcgPlugin.stopMonitor({ pid: currentDeviceId });
    EcgPlugin.removeAllListeners();
    setCurrentDeviceId('');
    setDeviceState('offline');

    ecgRawDatas = [];
    ecgResults = [];

    console.log('analysis hrv', {
      intervalList: _ecgResults.map((result) => result.rrInterval),
      beatList: _ecgResults.map((result) => result.beatType),
    });

    setReportUUIDs([]);

    return {
      ecgRawDatas: _ecgRawDatas,
      ecgResults: _ecgResults,
      hrvReport: hrvReport.data,
    };
  }

  const [present] = useIonToast();

  async function stop(fromEvent = false) {
    console.log('this is stop', fromEvent);
    try {
      if (deviceState === 'online') {
        const result = await stopMonitor();
        const { ecgRawDatas, ecgResults, hrvReport } = result;
        db.ecgRecords.add({
          reportUUIDList: reportUUIDs,
          originalEcgData: makeArrayCsv(ecgRawDatas ?? []),
          chDetectionResult: makeArrayCsv(ecgResults ?? []),
          hrvReport,
          timestamp: Date.now(),
          synced: false,
          userId:
            Number((await localforage.getItem<UserInfo>('user'))?.user?.id) ??
            0,
        });
        const event = new CustomEvent('stop-monitor');
        window.dispatchEvent(event);
        if (fromEvent) {
          alert('已到测量结束时间，测量完毕');
        }
        // 上报心电数据
      }
    } catch (e) {
      if (fromEvent) {
        alert('我们还没有收集到足够的心电数据，请稍后手动停止');
        return;
      }
      present({
        message: '请稍等，我们还没有收集到足够的心电数据',
        duration: 1500,
        position: 'top',
      });
    }
  }

  useEffect(() => {
    const lis = () => {
      stop(true);
    };
    window.addEventListener('out-stop', lis);

    return () => {
      window.removeEventListener('out-stop', lis);
    };
  }, [deviceState]);

  useEffect(() => {
    let timer: any;
    if (deviceState === 'online') {
      timer = setTimeout(() => {
        if ((window as any).heart === '-') {
          alert('未采集到心电数据，请检查心电贴');
        }
      }, 1000 * 30);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [deviceState]);

  console.log('this is device state', deviceState);

  console.log('cur path', location.pathname);

  return (
    <EcgDeviceContext.Provider
      value={{
        deviceState,
        currentDeviceId,
        connectToDevice,
        debugMessages,
        stopMonitor,
        cancelMonitor,
        reportUUIDs: reportUUIDs,
        addReportUUIDs: (id: string) => setReportUUIDs((ids) => [...ids, id]),
        bpm: heartRate,
        nearRawData: nearRawDatas,
        red,
      }}
    >
      <div>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/eva-list">
                <EvaluationList />
              </Route>
              <Route exact path="/ecg-only">
                <EcgOnly />
              </Route>
              <Route exact path="/eva-detail">
                <EvaluationDetail />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/sync-list">
                <SyncList />
              </Route>
              <Route exact path="/time-set">
                <TimeSet />
              </Route>
              <Route exact path="/">
                <Redirect to="/eva-list" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
        <IonModal isOpen={showDeviceList}>
          <IonLoading
            mode="ios"
            message="正在连接设备，请确保设备处于打开状态..."
            isOpen={connecting}
          ></IonLoading>
          <div className="list">
            <div className="list-title" style={{ marginBottom: 24 }}>
              请选择心电贴进行连接
            </div>
            {deviceList.map((device) => (
              <div
                className="list-card"
                key={device.pid}
                onClick={() => {
                  const event = new CustomEvent('device-selected');
                  (event as any)!.value = {
                    pid: device.pid,
                  };
                  window.dispatchEvent(event);
                }}
              >
                {device.pid}
              </div>
            ))}
          </div>
        </IonModal>
        {deviceState === 'online' &&
          ReactDOM.createPortal(
            <div
              onClick={async () => {
                setShowCancel(true);
                clearTimeout(cancelTimer);
                cancelTimer = setTimeout(() => {
                  setShowCancel(false);
                }, 4000);
              }}
            >
              {showCancel ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: '12px',
                  }}
                >
                  <div
                    className="ecg-status"
                    onClick={() => {
                      if (showCancel) {
                        stop();
                      }
                    }}
                    style={{ fontSize: 24, fontWeight: 'bold' }}
                  >
                    ⏸️ 停止
                  </div>
                  <div
                    className="ecg-status"
                    id="present-alert"
                    onClick={() => {
                      setIsExitShow(true);
                    }}
                    style={{ fontSize: 24, fontWeight: 'bold', right: '130px' }}
                  >
                    ❌ 断开
                  </div>
                </div>
              ) : (
                <div className="ecg-status">
                  <div className="ecg-heart">❤️</div>
                  <div className="ecg-status-right">
                    <div
                      className="ecg-status-bpm"
                      style={{ color: red ? 'red' : 'green' }}
                    >
                      {heartRate}bpm
                    </div>
                    <div className="ecg-status-bpm">{timeShow}</div>
                    <div className="pid">{curShowPid}</div>
                    <div className="pid" style={{ marginLeft: -4 }}>
                      🔋{battery[curShowPid]}%
                    </div>
                  </div>
                </div>
              )}
            </div>,
            document.body
          )}
        <IonAlert
          header="确认断开心电贴吗？"
          mode="ios"
          isOpen={isExitShow}
          buttons={[
            {
              text: '继续测试',
              role: 'cancel',
              handler: () => {
                setIsExitShow(false);
              },
            },
            {
              text: '确认断开',
              role: 'confirm',
              cssClass: 'red',
              handler: () => {
                cancelMonitor();
                setTimeout(() => {
                  alert('心电贴已断开');
                  location.href = '/';
                  window.history.replaceState(null, '', '/');
                }, 10);
              },
            },
          ]}
          onDidDismiss={({ detail }) =>
            console.log(`Dismissed with role: ${detail.role}`)
          }
        ></IonAlert>
      </div>
    </EcgDeviceContext.Provider>
  );
};

export default App;
