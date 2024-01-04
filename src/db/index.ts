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
  realName?: string;
  phone?: string;
  departmentEvaluationId?: number | null;
  individualEvaluationId?: number | null;
}

export interface EcgRecord {
  id?: number;
  originalEcgData?: any;
  chDetectionResult?: any;
  timestamp?: number;
  synced?: boolean;
  hrvReport?: HrvReport;
  reportUUIDList?: string[];
  userId: number;
}

export class DB extends Dexie {
  reports!: Table<Report>;
  ecgRecords!: Table<EcgRecord>;

  constructor() {
    super('report');
    this.version(2).stores({
      reports:
        '++id, uuid, scaleUUId, userId, evaReport, originalEcgData, chDetectionResult, hrvReport, timestamp, synced, realName, phone, departmentEvaluationId, individualEvaluationId',
      ecgRecords:
        '++id, originalEcgData, chDetectionResult, timestamp, synced, hrvReport, reportUUIDList, userId',
    });
  }
}

export const db = new DB();
