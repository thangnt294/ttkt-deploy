import {
  Request, RequestHandler, Response, NextFunction
} from 'express';
import { TeamDocument } from '../../domain/team/Team';
import TeamService from '../../domain/team/service/team-service';
import { getCurrentUserId } from '../../utils/RequestUtils';
import { MemberTeamInfo } from '../../domain/team/payload/MemberTeamInfo';
import { MemberTeamRole } from '../../utils/constant/MemberTeamRole';

const create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamInfo: TeamDocument = req.body;
    const reqUserId: string = getCurrentUserId(req);
    teamInfo.members.push({
      memberId: reqUserId,
      role: MemberTeamRole.OWNER
    } as MemberTeamInfo);
    res.send(await TeamService.createTeam(teamInfo, reqUserId));
  } catch (err) {
    next(err);
  }
};

export default create;
