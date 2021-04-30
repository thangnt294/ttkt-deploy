import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import { TaskDocument } from '../../domain/task/Task';
import TaskService from '../../domain/task/service/task-service';
import { getVal, isEmpty } from '../../utils/ObjectUtils';

const update: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTaskId: string = getVal(req.params, '', 'id');
    const reqTaskInfo: TaskDocument = {
      name: getVal(req.body, '', 'name'),
      description: getVal(req.body, '', 'description'),
      assignee: req.body.assignee,
      status: getVal(req.body, '', 'status'),
      dueDate: getVal(req.body, '', 'dueDate')
    } as TaskDocument;
    res.send(await TaskService.updateTask(reqTaskId, reqTaskInfo));
  } catch (err) {
    next(err);
  }
};

export default update;
