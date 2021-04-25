import { NextFunction, Request, Response } from 'express';
import { getCurrentUserId } from '../utils/RequestUtils';
import TeamService from '../domain/team/service/team-service';
import { TeamDocument } from '../domain/team/Team';
import { isEqual } from '../utils/ObjectUtils';
import ApplicationError from '../utils/errors/application-error';
import { ReturnMessage } from '../utils/constant/return-message';
import { HttpStatus } from '../utils/constant/http-status';
import {MemberTeamRole} from "../utils/constant/MemberTeamRole";

class DeleteMemberCheckMiddleware {
  public throwIfInvalidRequest = async (req: Request, res: Response, next: NextFunction) => {
    const reqMemberId: string = getCurrentUserId(req);
    const teams: TeamDocument[] = await TeamService.findTeamsByMemberId(reqMemberId);
    const isAnyTeamOwner: boolean = this.checkIfIsAnyTeamOwner(teams, reqMemberId);
    if (isAnyTeamOwner) {
      return next(new ApplicationError(ReturnMessage.CANNOT_DELETE_OWNER, HttpStatus.BAD_REQUEST));
    }

    return next();
  }

  public checkIfIsAnyTeamOwner = (
    teams: TeamDocument[],
    reqMemberId: string
  ): boolean => teams.some(team => team.members.some(member => isEqual(member.memberId, reqMemberId) && isEqual(member.role, MemberTeamRole.OWNER)))
}

export default new DeleteMemberCheckMiddleware();
