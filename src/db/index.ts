import Dexie, { Table } from 'dexie';
import { HrvReport } from '../tools/ecg-plugin';

export interface Report {
  id?: number;
  uuid?: string;
  scaleUUId: string;
  userId: number;
  evaReport: any;
  hrvReport?: HrvReport;
  originalEcgData?: any;
  chDetectionResult?: any;
  timestamp?: number;
  synced?: boolean;
}

export class DB extends Dexie {
  reports!: Table<Report>;

  constructor() {
    super('report');
    this.version(2).stores({
      reports:
        '++id, uuid, scaleUUId, userId, evaReport, originalEcgData, chDetectionResult, hrvReport, timestamp, synced',
    });
  }
}

export const db = new DB();
