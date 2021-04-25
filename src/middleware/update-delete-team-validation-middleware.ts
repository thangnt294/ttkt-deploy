import { NextFunction, Request, Response } from 'express';
import { ReturnMessage } from '../utils/constant/return-message';
import { getVal, isEqual } from '../utils/ObjectUtils';
import ApplicationError from '../utils/errors/application-error';
import TeamService from '../domain/team/service/team-service';
import { HttpStatus } from '../utils/constant/http-status';
import Team, { TeamDocument } from '../domain/team/Team';
import { MemberTeamInfo } from '../domain/team/payload/MemberTeamInfo';
import { getCurrentUserId } from '../utils/RequestUtils';
import { MemberTeamRole } from '../utils/constant/MemberTeamRole';

class UpdateDeleteTeamValidationMiddleware {
  public throwIfCannotEditTeam = async (req: Request, res: Response, next: NextFunction) => {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqUserId: string = getCurrentUserId(req);
    const team: TeamDocument = await Team.findById(reqTeamId).lean();

    const canEditTeam: boolean = this.checkIfCanEditTeam(reqUserId, team);
    if (!canEditTeam) {
      return next(new ApplicationError(ReturnMessage.NO_PERMISSION, HttpStatus.FORBIDDEN));
    }

    return next();
  }

  public checkIfCanEditTeam = (reqUserId: string, team: TeamDocument): boolean => {
    const teamMembers: MemberTeamInfo[] = getVal(team, [], 'members');
    return [MemberTeamRole.OWNER, MemberTeamRole.ADMIN].includes(TeamService.getMemberRoleInTeam(reqUserId, teamMembers));
  }

  public throwIfCannotDeleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqUserId: string = getCurrentUserId(req);
    const team: TeamDocument = await Team.findById(reqTeamId).lean();

    const canDeleteTeam: boolean = this.checkIfCanDeleteTeam(reqUserId, team);
    if (!canDeleteTeam) {
      return next(new ApplicationError(ReturnMessage.CANNOT_DELETE_TEAM, HttpStatus.FORBIDDEN));
    }

    return next();
  }

  public checkIfCanDeleteTeam = (reqUserId: string, team: TeamDocument): boolean => {
    const teamMembers: MemberTeamInfo[] = getVal(team, [], 'members');
    return isEqual(TeamService.getMemberRoleInTeam(reqUserId, teamMembers), MemberTeamRole.OWNER);
  }
}

export default new UpdateDeleteTeamValidationMiddleware();
