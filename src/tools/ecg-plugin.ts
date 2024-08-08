import { registerPlugin } from "@capacitor/core";
import { createContext } from "react";

export type Device = { devices: { pid: string; mac: string; name: string }[] };

export type DeviceState = "offline" | "online";

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
  stop: (fromEvent?: boolean) => Promise<void>;
  finishList: Array<[string, string, number]>;
  setFinishList: React.Dispatch<React.SetStateAction<[string, string, number][]>>;
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
  deviceState: "offline",
  currentDeviceId: "",
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
  bpm: "",
  nearRawData: [],
  red: false,
  stop: async () => void 0,
  finishList: [],
  setFinishList: () => void 0
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
    eventName: "ecgDeviceFound",
    listener: (device: Device) => void
  ): void;
  addListener(
    eventName: "ecgRawMessage",
    listener: (data: { what: number; arg1: number; arg2: number }) => void
  ): void;
  addListener(
    eventName: "ecgRawData",
    listener: (data: EcgRawData) => void
  ): void;
  addListener(
    eventName: "heartRate",
    listener: (data: { heartRate: number }) => void
  ): void;
  addListener(
    eventName: "connected",
    listener: (data: { success: boolean }) => void
  ): void;
  addListener(
    eventName: "ecgResult",
    listener: (data: EcgResult) => void
  ): void;
  addListener(
    eventName: "plugin-init",
    listener: (data: { success: boolean }) => void
  ): void;
  addListener(eventName: "battery", listener: (data: any) => void): void;
  addListener(eventName: "dis", listener: (data: any) => void): void;
  removeAllListeners(): void;
  initEcgPlugin(): void;
  restart(): void;
  stopScan(): void;
};

let EcgPlugin: EcgPlugin;
if (process.env.REACT_APP_ECG_DEBUG === "true") {
  console.debug("debug模式，不连接设备");
  EcgPlugin = {
    startScan: (props: { time: number }) => {
      console.log("Starting scan...");
    },
    connect: (props: { pid: string }) => {
      console.log("Connecting to device with pid:", props.pid);
    },
    startMonitor: (props: { pid: string }) => {
      console.log("Starting monitor for device with pid:", props.pid);
    },
    stopMonitor: (props: { pid: string }) => {
      console.log("Stopping monitor for device with pid:", props.pid);
    },
    analysisHrv: async (props: {
      intervalList: number[];
      beatList: number[];
    }) => {
      console.log("Analyzing HRV...");
      return {
        data: {
          mean: 0,
          sdnn: 0,
          sdann: 0,
          sdnni: 0,
          rmsssd: 0,
          pnn50: 0,
          triangularIndex: 0,
          tp: 0,
          vlf: 0,
          lf: 0,
          hf: 0,
          lfNorm: 0,
          hfNorm: 0,
          ratioLHF: 0,
          powerData: [],
          intervalStatistics: [],
        },
      };
    },
    addListener: (eventName: string, listener: any) => {
      console.log(`Listener added for event: ${eventName}`);
    },
    removeAllListeners: () => {
      console.log("All listeners removed.");
    },
    initEcgPlugin: () => {
      console.log("ECG plugin initialized.");
    },
    restart: () => {
      console.log("ECG plugin restarted.");
    },
    stopScan: () => {
      console.log("Scan stopped.");
    },
  };
} else {
  console.debug("Ecg注册，需连接设备");
  EcgPlugin = registerPlugin<EcgPlugin>("Ecg");
}

export default EcgPlugin;
