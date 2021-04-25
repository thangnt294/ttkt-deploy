import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import { TaskDocument } from '../../domain/task/Task';
import TaskService from '../../domain/task/service/task-service';
import { getVal } from '../../utils/ObjectUtils';
import { getCurrentUserId } from '../../utils/RequestUtils';

const create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTaskInfo: TaskDocument = {
      name: getVal(req.body, '', 'name'),
      description: getVal(req.body, '', 'description'),
      assignee: getVal(req.body, '', 'assignee'),
      status: getVal(req.body, '', 'status'),
      dueDate: getVal(req.body, '', 'dueDate')
    } as TaskDocument;
    const reqTeamId: string = getVal(req.body, '', 'teamId');
    const reqUserId: string = getCurrentUserId(req);
    res.send(await TaskService.createTask(reqTaskInfo, reqTeamId, reqUserId).then(() => 'OK'));
  } catch (err) {
    next(err);
  }
};

export default create;
