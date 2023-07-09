import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { registerPlugin } from '@capacitor/core';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { codeToMessage } from '../constants/ecg';
import Heart from '../components/Heart';

type Device = { devices: { pid: string; mac: string; name: string }[] };

type EcgPlugin = {
  startScan: (props: { time: number }) => void;
  connect: (props: { pid: string }) => void;
  startMonitor: (props: { pid: string }) => void;
  addListener(
    eventName: 'ecgDeviceFound',
    listener: (device: Device) => void
  ): void;
  addListener(
    eventName: 'ecgRawMessage',
    listener: (data: { what: number; arg1: number; arg2: number }) => void
  ): void;
  addListener(
    eventName: 'ecgRawData',
    listener: (data: { time: number; isLost: number; data: number[] }) => void
  ): void;
  addListener(
    eventName: 'heartRate',
    listener: (data: { heartRate: number }) => void
  ): void;
};

let pid = '';

const EcgPlugin = registerPlugin<EcgPlugin>('Ecg');

const Home: React.FC = () => {
  const [ecgData, setEcgData] = useState<number[]>([]);

  console.log('ecg data', ecgData);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <h1
          onClick={() => {
            EcgPlugin.addListener('ecgDeviceFound', (data) => {
              console.log('Device list', data);
              pid = data.devices[0].pid;
              EcgPlugin.connect({ pid: data.devices[0].pid });
            });
            EcgPlugin.addListener('ecgRawMessage', (data) => {
              console.log(
                'Raw message',
                codeToMessage[data.what as unknown as any],
                data.what,
                data.arg1,
                data.arg2
              );
            });
            EcgPlugin.addListener('ecgRawData', (data) => {
              // console.log('Raw data', JSON.stringify(data, null, 2));
              setEcgData((ecg) => {
                const arr = [...ecg, ...data.data];
                return arr.slice(Math.max(0, arr.length - 2000), arr.length);
              });
            });
            EcgPlugin.startScan({ time: 30000 });
            EcgPlugin.addListener('heartRate', (data) => {
              console.log('❤️ heart reate', data.heartRate);
            });
          }}
        >
          Run
        </h1>

        <h2
          onClick={() => {
            EcgPlugin.startMonitor({ pid });
          }}
        >
          开始获取数据
        </h2>
        <svg width="800" height="400">
          {/* 绘制心电图线条 */}
          <path
            d={`M0 200 ${ecgData
              .map((d, i) => `L${i * 2} ${200 - d}`)
              .join(' ')}`}
            fill="none"
            stroke="blue"
          />
        </svg>
        <Heart />
      </IonContent>
    </IonPage>
  );
};

export default Home;
