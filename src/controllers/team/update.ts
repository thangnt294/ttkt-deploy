import {
  Request, RequestHandler, Response, NextFunction
} from 'express';
import TeamService from '../../domain/team/service/team-service';
import { getVal } from '../../utils/ObjectUtils';
import { TeamDocument } from '../../domain/team/Team';
import { getCurrentUserId } from '../../utils/RequestUtils';

const update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqTeamInfo: TeamDocument = req.body;
    const currentUserId: string = getCurrentUserId(req);
    res.send(await TeamService.updateTeam(reqTeamId, reqTeamInfo, currentUserId));
  } catch (err) {
    next(err);
  }
};

export default update;
