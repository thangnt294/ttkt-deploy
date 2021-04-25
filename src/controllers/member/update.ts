import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import { getCurrentUserId } from '../../utils/RequestUtils';
import { MemberDocument } from '../../domain/team/Member';
import MemberService from '../../domain/team/service/member-service';

const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqMemberId: string = getCurrentUserId(req);
    const reqMemberInfo: MemberDocument = req.body;
    res.send(await MemberService.updateMember(reqMemberId, reqMemberInfo));
  } catch (err) {
    next(err);
  }
};

export default update;
