import { Request, RequestHandler, Response } from 'express';
import MemberService from '../../domain/team/service/member-service';
import { getCurrentUserId } from '../../utils/RequestUtils';
import { ReturnMessage } from '../../utils/constant/return-message';

export const deleteAccount: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const reqMemberId: string = getCurrentUserId(req);
    res.send(await MemberService.deleteAccount(reqMemberId).then(() => ({ message: ReturnMessage.DELETED_ACCOUNT })));
  } catch (e) {
    next(e);
  }
};
