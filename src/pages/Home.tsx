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

import localforage from 'localforage';

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
  addListener(
    eventName: 'ecgResult',
    listener: (data: {
      time: number;
      qrsIndex: number;
      qrsDelay: number;
      beatType: number;
      rrInterval: number;
      heartRate: number;
      morphType: number;
      morphId: number;
      morphData: number[];
      abnormalbeat: number[];
    }) => void
  ): void;
};

let pid = '';

(window as any).local = localforage;

const EcgPlugin = registerPlugin<EcgPlugin>('Ecg');

const intervalList: number[] = [];
const beatTypeList: number[] = [];

const ecgResultList: any[] = [];

const Home: React.FC = () => {
  const [ecgData, setEcgData] = useState<number[]>([]);
  const [count, setCount] = useState(0);

  // console.log('ecg data', ecgData);
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
            // EcgPlugin.addListener('ecgRawMessage', (data) => {

            // });
            // EcgPlugin.addListener('ecgRawData', (data) => {
            //   // console.log('Raw data', JSON.stringify(data, null, 2));
            //   // setEcgData((ecg) => {
            //   //   const arr = [...ecg, ...data.data];
            //   //   return arr.slice(Math.max(0, arr.length - 2000), arr.length);
            //   // });
            // });

            EcgPlugin.addListener('ecgResult', (data) => {
              // console.log('ecg result 心脏跳动', data);
              intervalList.push(data.rrInterval);
              beatTypeList.push(data.beatType);
              ecgResultList.push(data);

              console.log('ecg result list', data);
              localforage.setItem('ecgResult', ecgResultList);
              setCount(ecgResultList.length);
            });

            EcgPlugin.startScan({ time: 30000 });
            EcgPlugin.addListener('heartRate', (data) => {
              // console.log('❤️ heart reate', data.heartRate);
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
          开始获取数据 {count}
        </h2>
        <Heart />
      </IonContent>
    </IonPage>
  );
};

export default Home;
