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

setupIonicReact();

// let ecgRawDatas: EcgRawData[] = demo.ecgRawDatas;
// let ecgResults: EcgResult[] = demo.ecgResults;
let ecgRawDatas: EcgRawData[] = [];
let ecgResults: EcgResult[] = [];
(window as any).ecgRawDatas = ecgRawDatas;

(window as any).db = db;

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
  const [heartRate, setHeartRate] = useState('---');
  const [nearRawDatas, setNearRawDatas] = useState<EcgRawData[]>([]);

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
      EcgPlugin.addListener('ecgRawData', (data) => {
        ecgRawDatas.push(data);

        console.log('raw data', data);
        // fetch('http://192.168.1.103:3000/log', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ key: 'ecgRawData', value: data }),
        // });
      });
      EcgPlugin.addListener('heartRate', (data) => {
        setHeartRate(data.heartRate > 0 ? String(data.heartRate) : '-');
      });
      EcgPlugin.addListener('ecgResult', (data) => {
        ecgResults.push(data);
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
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeShow(
        `${String(
          new Date(Date.now() - connectedTimestamp).getMinutes()
        ).padStart(2, '0')}:${String(
          new Date(Date.now() - connectedTimestamp).getSeconds()
        ).padStart(2, '0')}`
      );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [connectedTimestamp]);

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

  console.log('[scale uuids]', reportUUIDs);

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
              className="ecg-status"
              onClick={async () => {
                setShowCancel(true);
                setTimeout(() => {
                  setShowCancel(false);
                }, 1000);
                if (showCancel) {
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
                          Number(
                            (await localforage.getItem<UserInfo>('user'))?.user
                              ?.id
                          ) ?? 0,
                      });
                      const event = new CustomEvent('stop-monitor');
                      window.dispatchEvent(event);
                      // 上报心电数据
                      console.log('心电数据', result);
                    }
                  } catch (e) {
                    present({
                      message: '请稍等，我们还没有收集到足够的心电数据',
                      duration: 1500,
                      position: 'top',
                    });
                    console.log('something went wrong', e);
                  }
                }
              }}
            >
              {showCancel ? (
                <div style={{ fontSize: 36, fontWeight: 'bold' }}>⏸️ 停止</div>
              ) : (
                <>
                  <div className="ecg-heart">❤️</div>
                  <div className="ecg-status-right">
                    <div className="ecg-status-bpm">{heartRate}bpm</div>
                    <div className="ecg-status-bpm">{timeShow}</div>
                  </div>
                </>
              )}
            </div>,
            document.body
          )}
      </div>
    </EcgDeviceContext.Provider>
  );
};

export default App;
