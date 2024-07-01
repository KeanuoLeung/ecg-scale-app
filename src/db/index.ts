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
  gender: number;
  identificationCard: string;
  age: number;
  unit: string;
  departmentEvaluationId?: number | null;
  individualEvaluationId?: number | null;
  test_uuid?: string | null;
  title?: string;
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
  title?: string;
}

export class DB extends Dexie {
  reports!: Table<Report>;
  ecgRecords!: Table<EcgRecord>;

  constructor() {
    super('report');
    this.version(2).stores({
      reports:
        '++id, uuid, scaleUUId, userId, evaReport, originalEcgData, chDetectionResult, hrvReport, timestamp, synced, realName, phone, departmentEvaluationId, individualEvaluationId, title, gender, identificationCard, age, unit',
      ecgRecords:
        '++id, originalEcgData, chDetectionResult, timestamp, synced, hrvReport, reportUUIDList, userId, title',
    });
  }
}

export const db = new DB();
