import { NextFunction, Request, Response } from 'express';
import { ReturnMessage } from '../utils/constant/return-message';
import { getVal, isEqual } from '../utils/ObjectUtils';
import ApplicationError from '../utils/errors/application-error';
import { HttpStatus } from '../utils/constant/http-status';
import TeamService from '../domain/team/service/team-service';
import Team, { TeamDocument } from '../domain/team/Team';
import { getCurrentUserId } from '../utils/RequestUtils';
import { MemberTeamInfo } from '../domain/team/payload/MemberTeamInfo';
import { MemberTeamRole } from '../utils/constant/MemberTeamRole';

class AddMemberValidationMiddleware {
  public throwIfInvalidRequest = async (req: Request, res: Response, next: NextFunction) => {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqUserId: string = getCurrentUserId(req);
    const reqMembers: MemberTeamInfo[] = getVal(req.body, '', 'members');
    const team: TeamDocument = await Team.findById(reqTeamId).lean();

    const canEditTeam: boolean = this.checkIfCanEditTeam(reqUserId, team);
    if (!canEditTeam) {
      return next(new ApplicationError(ReturnMessage.NO_PERMISSION, HttpStatus.FORBIDDEN));
    }

    const addOwner: boolean = this.checkIfAddOwner(reqMembers);
    if (addOwner) {
      return next(new ApplicationError(ReturnMessage.CANNOT_ADD_OWNER, HttpStatus.FORBIDDEN));
    }

    return next();
  }

  public checkIfCanEditTeam = (reqUserId: string, team: TeamDocument): boolean => {
    const teamMembers: MemberTeamInfo[] = getVal(team, [], 'members');
    return [MemberTeamRole.OWNER, MemberTeamRole.ADMIN].includes(TeamService.getMemberRoleInTeam(reqUserId, teamMembers));
  }

  public checkIfAddOwner = (reqMembers: MemberTeamInfo[]): boolean => reqMembers.some(member => isEqual(member.role, MemberTeamRole.OWNER))
}

export default new AddMemberValidationMiddleware();
