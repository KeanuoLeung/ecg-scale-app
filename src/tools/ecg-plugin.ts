import { registerPlugin } from '@capacitor/core';
import { createContext } from 'react';

export type Device = { devices: { pid: string; mac: string; name: string }[] };

export type DeviceState = 'offline' | 'online';

export type EcgDevice = {
  deviceState: DeviceState;
  currentDeviceId: string;
  connectToDevice: () => Promise<boolean>;
  debugMessages: string[];
  stopMonitor: () => Promise<{
    ecgRawDatas: EcgRawData[];
    ecgResults: EcgResult[];
    hrvReport?: HrvReport;
  }>;
  cancelMonitor: () => void;
  reportUUIDs: string[];
  addReportUUIDs: (string: string) => void;
  bpm: string;
  nearRawData: EcgRawData[];
  red: boolean;
};

export type EcgRawData = { time: number; isLost: boolean; data: number[] };

export type EcgResult = {
  time: number;
  qrsIndex: number;
  qrsDelay: number;
  beatType: number;
  rrInterval: number;
  heartRate: number;
  morphType: number;
  morphId: number;
};

export interface HrvReport {
  mean: number;
  sdnn: number;
  sdann: number;
  sdnni: number;
  rmsssd: number;
  pnn50: number;
  triangularIndex: number;
  tp: number;
  vlf: number;
  lf: number;
  hf: number;
  lfNorm: number;
  hfNorm: number;
  ratioLHF: number;
  powerData: number[];
  intervalStatistics: number[];
}

export const EcgDeviceContext = createContext<EcgDevice>({
  deviceState: 'offline',
  currentDeviceId: '',
  connectToDevice: async () => {
    return false;
  },
  stopMonitor: async () => {
    return { ecgRawDatas: [], ecgResults: [], hrvReport: undefined };
  },
  cancelMonitor: () => void 0,
  debugMessages: [],
  reportUUIDs: [],
  addReportUUIDs: () => void 0,
  bpm: '',
  nearRawData: [],
  red: false,
});

type EcgPlugin = {
  startScan: (props: { time: number }) => void;
  connect: (props: { pid: string }) => void;
  startMonitor: (props: { pid: string }) => void;
  stopMonitor: (props: { pid: string }) => void;
  analysisHrv: (props: {
    intervalList: number[];
    beatList: number[];
  }) => Promise<{ data: HrvReport }>;
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
    listener: (data: EcgRawData) => void
  ): void;
  addListener(
    eventName: 'heartRate',
    listener: (data: { heartRate: number }) => void
  ): void;
  addListener(
    eventName: 'connected',
    listener: (data: { success: boolean }) => void
  ): void;
  addListener(
    eventName: 'ecgResult',
    listener: (data: EcgResult) => void
  ): void;
  addListener(eventName: 'battery', listener: (data: any) => void): void;
  addListener(eventName: 'dis', listener: (data: any) => void): void;
  removeAllListeners(): void;
};

const EcgPlugin = registerPlugin<EcgPlugin>('Ecg');

export default EcgPlugin;
