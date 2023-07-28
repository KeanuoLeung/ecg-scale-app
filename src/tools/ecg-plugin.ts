import { registerPlugin } from '@capacitor/core';
import { createContext } from 'react';

type Device = { devices: { pid: string; mac: string; name: string }[] };

export type DeviceState = 'offline' | 'online';

export type EcgDevice = {
  deviceState: DeviceState;
  currentDeviceId: string;
  connectToDevice: () => void;
  debugMessages: string[];
  stopMonitor: () => { ecgRawDatas: any[]; ecgResults: any[] };
};

export const EcgDeviceContext = createContext<EcgDevice>({
  deviceState: 'offline',
  currentDeviceId: '',
  connectToDevice: () => void 0,
  stopMonitor: () => {
    return { ecgRawDatas: [], ecgResults: [] };
  },
  debugMessages: [],
});

type EcgPlugin = {
  startScan: (props: { time: number }) => void;
  connect: (props: { pid: string }) => void;
  startMonitor: (props: { pid: string }) => void;
  stopMonitor: (props: { pid: string }) => void;
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
    eventName: 'connected',
    listener: (data: { success: boolean }) => void
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
  removeAllListeners(): void;
};

const EcgPlugin = registerPlugin<EcgPlugin>('Ecg');

export default EcgPlugin;
