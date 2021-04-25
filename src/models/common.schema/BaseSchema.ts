import { Document, Schema } from 'mongoose';
import { nowAsMillis } from '../../utils/DateTimeUtils';

export interface AuditDocument extends Document {
  createdBy: string;
  createdDate: number;
  updatedBy: string;
  updatedDate: number;
}

const BaseSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'Member' },
  createdDate: { type: Number, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Member' },
  updatedDate: { type: Number, default: Date.now }
});

export default BaseSchema;
