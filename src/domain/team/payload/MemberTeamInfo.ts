import {MemberTeamRole} from "../../../utils/constant/MemberTeamRole";

export class MemberTeamInfo {
  private _memberId: string;

  private _role: MemberTeamRole;

  get memberId(): string {
    return this._memberId;
  }

  set memberId(value: string) {
    this._memberId = value;
  }

  get role(): MemberTeamRole {
    return this._role;
  }

  set role(value: MemberTeamRole) {
    this._role = value;
  }
}
