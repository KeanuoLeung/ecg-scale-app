import Dexie, { Table } from 'dexie';

export interface Friend {
  id?: number;
  name: string;
  age: number;
}

export class DB extends Dexie {
  friends!: Table<Friend>;

  constructor() {
    super('db');
    this.version(1).stores({
      friends: '++id, name, age',
    });
  }
}

export const db = new DB();
