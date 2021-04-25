import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';
import { getVal, isEqual } from '../../utils/ObjectUtils';
import Team, { TeamDocument } from '../../domain/team/Team';
import { MemberPageRequest } from '../../utils/common/paging/MemberPageRequest';
import MemberService from '../../domain/team/service/member-service';
import { PageableExecutionUtils } from '../../utils/common/paging/PageableExecutionUtils';
import { MemberTeamInfo } from '../../domain/team/payload/MemberTeamInfo';

export const findMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamId: string = getVal(req.params, '', 'id');
    const team: TeamDocument = await Team.findById(teamId).lean();
    const memberIds: mongoose.Types.ObjectId[] = team.members.map(member => mongoose.Types.ObjectId(member.memberId));
    const memberTeamInfo: MemberTeamInfo[] = team.members;
    const memberPageRequest: PageRequest = MemberPageRequest.getPageRequest(req, memberIds);
    const result: any = await MemberService.findMembers(memberPageRequest);
    result[0] = result[0].map((member: any) => (
      {
        ...member,
        role: memberTeamInfo.find(memberInfo => isEqual(memberInfo.memberId.toString(), member._id.toString()))?.role
      }
    ));
    res.send(PageableExecutionUtils.getPage(result[0], req, result[1]));
  } catch (err) {
    next(err);
  }
};
