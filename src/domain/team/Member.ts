import {
  Document, Model, model, Schema
} from 'mongoose';
import * as mongoose from 'mongoose';
import BaseSchema, { AuditDocument } from '../../models/common.schema/BaseSchema';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';
import { MemberInfo } from './payload/MemberInfo';

export class MemberDocument extends Document {
  name: string;

  email: string;

  password: string;

  avatar: string;

  base: AuditDocument;
}

const schema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  avatar: { type: String },
  base: { type: BaseSchema }
});

const Member: Model<MemberDocument> = model<MemberDocument, Model<MemberDocument>>('Member', schema);

export const FindMembers = async (pageRequest: PageRequest): Promise<MemberDocument[]> => Member.aggregate()
  .match(pageRequest.query)
  .sort(pageRequest.sort)
  .skip(pageRequest.skip)
  .limit(pageRequest.limit)
  .project(pageRequest.projection);

export const FindMemberInfo = async (memberId: mongoose.Types.ObjectId): Promise<any> => Member.aggregate()
  .match({
    _id: memberId
  })
  .lookup({
    from: 'teams',
    localField: '_id',
    foreignField: 'members.memberId',
    as: 'teams'
  })
  .project({
    name: 1,
    email: 1,
    contactNumber: 1,
    avatar: 1,
    teams: {
      _id: 1,
      name: 1,
      description: 1
    }
  });
export const UpdateMember = async (
  reqMemberId: string,
  reqMemberInfo: MemberDocument
): Promise<any> => Member.findByIdAndUpdate(reqMemberId, reqMemberInfo);

export const ChangePassword = async (
  reqEmail: string,
  hashedPassword: string
): Promise<any> => Member.findOneAndUpdate({ email: reqEmail }, {
  password: hashedPassword
});

export const DeleteAccount = async (
  reqMemberId: string
): Promise<any> => Member.findByIdAndDelete(reqMemberId);

export default Member;
