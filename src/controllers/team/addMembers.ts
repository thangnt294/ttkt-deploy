import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import TeamService from '../../domain/team/service/team-service';
import { getVal } from '../../utils/ObjectUtils';
import { MemberTeamInfo } from '../../domain/team/payload/MemberTeamInfo';

const addMembers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTeamId: string = getVal(req.params, '', 'id');
    const reqMemberInfos: MemberTeamInfo[] = getVal(req.body, '', 'members');
    res.send(await TeamService.addMembersToTeam(reqTeamId, reqMemberInfos));
  } catch (err) {
    next(err);
  }
};

export default addMembers;
