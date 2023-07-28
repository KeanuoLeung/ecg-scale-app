import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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

/* Theme variables */
import './theme/variables.css';
import EvaluationList from './pages/evaluation-list';
import EvaluationDetail from './pages/evaluation-detail';
import EcgPlugin, { EcgDevice, EcgDeviceContext } from './tools/ecg-plugin';

setupIonicReact();

let ecgRawDatas: any[] = [];
let ecgResults: any[] = [];

const App: React.FC = () => {
  const [deviceState, setDeviceState] =
    useState<EcgDevice['deviceState']>('offline');
  const [currentDeviceId, setCurrentDeviceId] =
    useState<EcgDevice['currentDeviceId']>('');
  const [debugMessages, setDebugMessages] = useState<string[]>([]);

  function log(str: string) {
    setDebugMessages((msgs) => [...msgs.slice(0, 10), str]);
  }

  function connectToDevice() {
    console.log('connec to device');
    let connected = false;
    log('connect to device');
    let pid = '';
    EcgPlugin.addListener('ecgDeviceFound', (data) => {
      // 连接搜索到的第一个心电设备
      log('device found');
      pid = data.devices[0].pid;
      EcgPlugin.connect({ pid });
      log('start connection');
    });
    EcgPlugin.startScan({ time: -1 });
    EcgPlugin.addListener('connected', (data) => {
      log('device connected');
      if (data.success && !connected) {
        connected = true;
        alert('connected');
        setCurrentDeviceId(pid);
        setDeviceState('online');
        // 开始监测
        EcgPlugin.addListener('ecgRawData', (data) => {
          ecgRawDatas.push(data);
          fetch('http://192.168.1.110:3000/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: 'ecgRawData', value: data }),
          });
        });
        EcgPlugin.addListener('ecgResult', (data) => {
          ecgResults.push(data);
          fetch('http://192.168.1.110:3000/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: 'ecgResult', value: data }),
          });
        });
        EcgPlugin.startMonitor({ pid });
        setInterval(() => {
          log(`a: ${ecgRawDatas.length} b: ${ecgResults.length}`);
        }, 1000);
      }
    });
  }

  function stopMonitor() {
    EcgPlugin.stopMonitor({ pid: currentDeviceId });
    EcgPlugin.removeAllListeners();

    const _ecgRawDatas = [...ecgRawDatas];
    const _ecgResults = [...ecgResults];

    ecgRawDatas = [];
    ecgResults = [];

    return { ecgRawDatas: _ecgRawDatas, ecgResults: _ecgResults };
  }

  console.log({ deviceState, currentDeviceId });

  return (
    <EcgDeviceContext.Provider
      value={{
        deviceState,
        currentDeviceId,
        connectToDevice,
        debugMessages,
        stopMonitor,
      }}
    >
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/eva-list">
              <EvaluationList />
            </Route>
            <Route exact path="/eva-detail">
              <EvaluationDetail />
            </Route>
            <Route exact path="/">
              <Redirect to="/eva-list" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </EcgDeviceContext.Provider>
  );
};

export default App;
