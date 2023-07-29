import React, { useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

import './index.css';
import { useHistory } from 'react-router';
import {
  IonActionSheet,
  IonLoading,
  IonPage,
  useIonViewDidLeave,
} from '@ionic/react';
import { db } from '../../db';
import { EcgDeviceContext } from '../../tools/ecg-plugin';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import base64ToFile from '../../tools/base64ToFile';
import { getList } from '../../api';
import useEvaList from '../../api/useEvaList';

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
  const {
    connectToDevice,
    debugMessages,
    deviceState,
    currentDeviceId,
    stopMonitor,
    cancelMonitor,
  } = useContext(EcgDeviceContext);

  const [connecting, setConnecting] = useState(false);

  const [opingEva, setOpingEva] = useState('');

  const list = useEvaList();

  useEffect(() => {
    if (!localStorage.getItem('endpoint')) {
      history.push('/settings');
    }
  }, []);
  return (
    <IonPage>
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
      <IonLoading
        mode="ios"
        message="正在连接设备，请确保设备处于打开状态..."
        isOpen={connecting}
      ></IonLoading>
      <div className="list">
        <div className="list-title">
          <span>🌞 欢迎您，user22</span>
          <span
            onClick={() => {
              history.push('/settings');
            }}
          >
            ⚙️
          </span>
        </div>
        {/* <div id="reader" style={{ width: 600, display: 'none' }}></div> */}
        <div
          className="list-subtitle"
          onClick={async () => {
            if (deviceState === 'offline') connectToDevice();
            if (deviceState === 'online') {
              const result = await stopMonitor();
              console.log('this is result', result.ecgRawDatas, result);
            }
          }}
        >
          请选择量表开始测试 {deviceState} {currentDeviceId}
        </div>
        {debugMessages.map((msg) => (
          <div key={msg} className="list-subtitle">
            {msg}
          </div>
        ))}
        {list.map((evaluation) => (
          <div
            className="list-card"
            key={evaluation.uuid}
            onClick={() => {
              setOpingEva(evaluation.uuid ?? '');
              // history.push('/eva-detail');
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
