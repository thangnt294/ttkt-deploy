import { MemberTeamRole } from '../../../utils/constant/MemberTeamRole';

export interface MemberInfo {
  name: string;

  email: string;

  contactNumber: string;

  teams: Array<TeamOfMemberInfo>;
}

interface TeamOfMemberInfo {
  id: string;

  name: string;

  description: string;

  role: MemberTeamRole;
}
