import { Request, RequestHandler, Response } from 'express';
import { getVal } from '../../utils/ObjectUtils';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';
import { TaskPageRequest } from '../../utils/common/paging/TaskPageRequest';
import { PageableExecutionUtils } from '../../utils/common/paging/PageableExecutionUtils';
import Team from '../../domain/team/Team';
import TaskService from '../../domain/task/service/task-service';

export const findMyTasks: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const taskPageRequest: PageRequest = TaskPageRequest.getPageRequest(req);
    const result: any = await TaskService.findTasks(taskPageRequest);
    res.send(PageableExecutionUtils.getPage(result[0], req, result[1]));
  } catch (err) {
    next(err);
  }
};

export const findTeamTasks: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const reqTeamId: string = getVal(req.query, '', 'teamId');
    const taskIds: string[] = (await Team.findById(reqTeamId).lean()).tasks;
    const taskPageRequest: PageRequest = TaskPageRequest.getPageRequest(req, taskIds);
    const result: any = await TaskService.findTasks(taskPageRequest);
    res.send(PageableExecutionUtils.getPage(result[0], req, result[1]));
  } catch (err) {
    next(err);
  }
};
