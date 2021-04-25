import { NextFunction, Request, Response } from 'express';
import { getVal, isEqual } from '../utils/ObjectUtils';
import { MemberTeamRole } from '../utils/constant/MemberTeamRole';
import { getCurrentUserId } from '../utils/RequestUtils';
import Team, { TeamDocument } from '../domain/team/Team';
import ApplicationError from '../utils/errors/application-error';
import { ReturnMessage } from '../utils/constant/return-message';
import { HttpStatus } from '../utils/constant/http-status';
import { MemberTeamInfo } from '../domain/team/payload/MemberTeamInfo';
import TeamService from '../domain/team/service/team-service';

class UpdateMemberRolesValidationMiddleware {
  public throwIfInvalidRequest = async (req: Request, res: Response, next: NextFunction) => {
    const reqMemberInfo: MemberTeamInfo = req.body;
    const reqUserId: string = getCurrentUserId(req);
    const reqTeamId: string = getVal(req.params, '', 'id');
    const team: TeamDocument = await Team.findById(reqTeamId).lean();

    const canEditTeam: boolean = this.checkIfCanEditTeam(reqUserId, team);
    if (!canEditTeam) {
      return next(new ApplicationError(ReturnMessage.NO_PERMISSION, HttpStatus.FORBIDDEN));
    }

    const changeRoleOfOwner: boolean = this.checkIfChangeRoleOfOwner(team, reqMemberInfo);
    if (changeRoleOfOwner) {
      return next(new ApplicationError(ReturnMessage.CANNOT_CHANGE_ROLE_OWNER, HttpStatus.BAD_REQUEST));
    }

    const makeAnotherMemberOwner: boolean = this.checkIfMakeAnotherMemberOwner(reqUserId, reqMemberInfo, team);
    if (makeAnotherMemberOwner) {
      return next(new ApplicationError(ReturnMessage.CANNOT_MAKE_ANOTHER_MEMBER_OWNER, HttpStatus.BAD_REQUEST));
    }

    return next();
  }

  public checkIfCanEditTeam = (reqUserId: string, team: TeamDocument): boolean => {
    const teamMembers: MemberTeamInfo[] = getVal(team, [], 'members');
    return [MemberTeamRole.OWNER, MemberTeamRole.ADMIN].includes(TeamService.getMemberRoleInTeam(reqUserId, teamMembers));
  }

  public checkIfChangeRoleOfOwner = (
    team: TeamDocument,
    reqMemberInfo: MemberTeamInfo
  ): boolean => team.members.some(member => isEqual(member.memberId.toString(), reqMemberInfo.memberId)
    && isEqual(member.role, MemberTeamRole.OWNER));

  public checkIfMakeAnotherMemberOwner = (reqUserId: string, reqMemberInfo: MemberTeamInfo, team: TeamDocument): boolean => {
    const teamMembers: MemberTeamInfo[] = getVal(team, [], 'members');
    const isOrgOwner: boolean = isEqual(TeamService.getMemberRoleInTeam(reqUserId, teamMembers), MemberTeamRole.OWNER);
    const isMakingAnotherMemberOwner: boolean = isEqual(reqMemberInfo.role, MemberTeamRole.OWNER);
    return !isOrgOwner && isMakingAnotherMemberOwner;
  }
}

export default new UpdateMemberRolesValidationMiddleware();
