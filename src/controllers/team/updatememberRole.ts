import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import TeamService from '../../domain/team/service/team-service';
import { getVal } from '../../utils/ObjectUtils';
import { MemberTeamInfo } from '../../domain/team/payload/MemberTeamInfo';

const updateMemberRole: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqMemberInfo: MemberTeamInfo = req.body;
    res.send(await TeamService.updateMemberRole(reqTeamId, reqMemberInfo));
  } catch (err) {
    next(err);
  }
};

export default updateMemberRole;
