import type { IAuditEntity } from './AuditEntity';

export interface IDiaryPost extends IAuditEntity {
  _id?: string;
  _rev?: string;
  date: Date;
  body: string;
}
