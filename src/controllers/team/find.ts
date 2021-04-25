import { NextFunction, Request, Response } from 'express';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';
import { TeamPageRequest } from '../../utils/common/paging/TeamPageRequest';
import { getVal, isEmpty } from '../../utils/ObjectUtils';
import Team from '../../domain/team/Team';
import TeamService from '../../domain/team/service/team-service';
import { PageableExecutionUtils } from '../../utils/common/paging/PageableExecutionUtils';

export const find = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamPageRequest: PageRequest = TeamPageRequest.getPageRequest(req);
    const reqMemberId: string = getVal(req.query, '', 'memberId');
    let result: any;
    if (!isEmpty(reqMemberId)) {
      result = await TeamService.findTeamsOfUser(teamPageRequest);
    } else {
      result = await TeamService.findTeams(teamPageRequest);
    }
    res.send(PageableExecutionUtils.getPage(result[0], req, result[1]));
  } catch (err) {
    next(err);
  }
};

export const findDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teamId: string = getVal(req.params, '', 'id');
    res.send(await Team.findById(teamId));
  } catch (err) {
    next(err);
  }
};
