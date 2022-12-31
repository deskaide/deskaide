import type { IAuditEntity } from './AuditEntity';

export interface INotePost extends IAuditEntity {
  _id?: string;
  _rev?: string;
  title: string;
  date: string;
  body: string;
}
