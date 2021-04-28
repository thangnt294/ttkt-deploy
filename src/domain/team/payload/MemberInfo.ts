import { MemberTeamRole } from '../../../utils/constant/MemberTeamRole';
import {MemberTeamInfo} from "./MemberTeamInfo";

export interface MemberInfo {
  _id: string;

  name: string;

  email: string;

  teams: Array<TeamOfMemberInfo>;
}

export interface TeamOfMemberInfo {
  id: string;

  name: string;

  description: string;

  members: Array<MemberTeamInfo>;

  role: MemberTeamRole;
}
