import Dexie, { Table } from 'dexie';

export interface Report {
  id?: number;
  uuid?: string;
  scaleId: number;
  userId: number;
  evaReport: any;
  originalEcgData?: any;
  chDetectionResult?: any;
}

export class DB extends Dexie {
  reports!: Table<Report>;

  constructor() {
    super('report');
    this.version(1).stores({
      reports:
        '++id, uuid, scaleId, userId, evaReport, originalEcgData, chDetectionResult',
    });
  }
}

export const db = new DB();
