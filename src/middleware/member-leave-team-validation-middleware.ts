import { NextFunction, Request, Response } from 'express';
import { getCurrentUserId } from '../utils/RequestUtils';
import TeamService from '../domain/team/service/team-service';
import Team, { TeamDocument } from '../domain/team/Team';
import {getVal, isEqual} from '../utils/ObjectUtils';
import ApplicationError from '../utils/errors/application-error';
import { ReturnMessage } from '../utils/constant/return-message';
import { HttpStatus } from '../utils/constant/http-status';
import {MemberTeamRole} from "../utils/constant/MemberTeamRole";

class MemberLeaveValidationMiddleware {
  public throwIfInvalidRequest = async (req: Request, res: Response, next: NextFunction) => {
    const reqMemberId: string = getCurrentUserId(req);
    const reqTeamId: string = getVal(req.query, '', 'teamId');
    const team: TeamDocument = await Team.findById(reqTeamId);
    const isTeamOwner: boolean = this.checkIfIsTeamOwner(team, reqMemberId);
    if (isTeamOwner) {
      return next(new ApplicationError(ReturnMessage.CANNOT_LEAVE_OWNER, HttpStatus.BAD_REQUEST));
    }

    return next();
  }

  public checkIfIsTeamOwner = (team: TeamDocument, reqMemberId: string) => {
    return team.members.some(member => isEqual(member.memberId.toString(), reqMemberId) && isEqual(member.role, MemberTeamRole.OWNER));
  }

}

export default new MemberLeaveValidationMiddleware();
