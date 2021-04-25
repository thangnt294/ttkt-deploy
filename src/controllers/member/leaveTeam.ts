import { Request, RequestHandler, Response } from 'express';
import { getVal } from '../../utils/ObjectUtils';
import { getCurrentUserId } from '../../utils/RequestUtils';
import MemberService from '../../domain/team/service/member-service';

export const leaveTeam: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const reqTeamId: string = getVal(req.params, '', 'teamId');
    const reqMemberId: string = getCurrentUserId(req);
    res.send(await MemberService.leaveTeam(reqTeamId, reqMemberId));
  } catch (e) {
    next(e);
  }
};
