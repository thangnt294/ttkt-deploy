import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import TeamService from '../../domain/team/service/team-service';
import { getVal } from '../../utils/ObjectUtils';

const deleteTeam: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTeamId = getVal(req.params, '', 'id');
    res.send(await TeamService.deleteTeam(reqTeamId));
    next();
  } catch (err) {
    next(err);
  }
};

export default deleteTeam;
