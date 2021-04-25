import { NextFunction, Request, Response } from 'express';
import TeamService from '../domain/team/service/team-service';
import { ReturnMessage } from '../utils/constant/return-message';
import { getVal, isEqual } from '../utils/ObjectUtils';
import ApplicationError from '../utils/errors/application-error';
import { HttpStatus } from '../utils/constant/http-status';
import Team, { TeamDocument } from '../domain/team/Team';
import { getCurrentUserId } from '../utils/RequestUtils';
import { MemberTeamInfo } from '../domain/team/payload/MemberTeamInfo';
import { MemberTeamRole } from '../utils/constant/MemberTeamRole';

class RemoveMemberValidationMiddleware {
  public throwIfInvalidRequest = async (req: Request, res: Response, next: NextFunction) => {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqMemberIds: string[] = getVal(req.body, [], 'memberIds');
    const reqUserId: string = getCurrentUserId(req);
    const team: TeamDocument = await Team.findById(reqTeamId);

    const canEditTeams: boolean = this.checkIfCanEditTeams(team, reqUserId);
    if (!canEditTeams) {
      return next(new ApplicationError(ReturnMessage.NO_PERMISSION, HttpStatus.FORBIDDEN));
    }

    const removeOwner: boolean = this.checkIfRemoveOwner(team, reqMemberIds);
    if (removeOwner) {
      return next(new ApplicationError(ReturnMessage.CANNOT_REMOVE_OWNER, HttpStatus.BAD_REQUEST));
    }

    return next();
  }

  public checkIfCanEditTeams = (team: TeamDocument, reqUserId: string) => {
    const teamMembers: MemberTeamInfo[] = getVal(team, [], 'members');
    return [MemberTeamRole.OWNER, MemberTeamRole.ADMIN].includes(TeamService.getMemberRoleInTeam(reqUserId, teamMembers));
  }

  public checkIfRemoveOwner = (
    team: TeamDocument,
    reqMemberIds: string[]
  ): boolean => reqMemberIds.includes(team.members.find(member => isEqual(member.role, MemberTeamRole.OWNER))?.memberId);
}

export default new RemoveMemberValidationMiddleware();
