import { AuditDocument } from '../../../models/common.schema/BaseSchema';

export class MemberInfoNew {
  _id: string;

  cognitoUserId: string;

  name: string;

  email: string;

  contactNumber: Array<string>;

  primaryContactNumber: string;

  avatar: string;

  role: string;

  status: string;

  cognitoUserStatus: string;

  numberTeams: number;

  base: AuditDocument;
}
