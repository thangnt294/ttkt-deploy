import { Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import MemberService from '../../domain/team/service/member-service';
import { getVal } from '../../utils/ObjectUtils';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';
import { MemberPageRequest } from '../../utils/common/paging/MemberPageRequest';
import { PageableExecutionUtils } from '../../utils/common/paging/PageableExecutionUtils';

export const find: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const memberPageRequest: PageRequest = MemberPageRequest.getPageRequest(req);
    const result: any = await MemberService.findMembers(memberPageRequest);
    res.send(PageableExecutionUtils.getPage(result[0], req, result[1]));
  } catch (err) {
    next(err);
  }
};

export const findDetail: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const memberId: mongoose.Types.ObjectId = mongoose.Types.ObjectId(getVal(req.params, '', 'id'));
    res.send(await MemberService.findMemberInfo(memberId));
  } catch (err) {
    next(err);
  }
};
