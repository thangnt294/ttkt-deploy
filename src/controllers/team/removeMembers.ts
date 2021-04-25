import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import TeamService from '../../domain/team/service/team-service';
import { getVal } from '../../utils/ObjectUtils';

const removeMembers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqMemberIds: string[] = getVal(req.body, '', 'memberIds');
    res.send(await TeamService.removeMembersFromTeam(reqMemberIds, reqTeamId));
  } catch (err) {
    next(err);
  }
};

export default removeMembers;
