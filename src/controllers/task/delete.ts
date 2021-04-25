import {
  NextFunction, Request, RequestHandler, Response
} from 'express';
import TaskService from '../../domain/task/service/task-service';
import { getVal } from '../../utils/ObjectUtils';

const deleteTask: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqTaskId: string = getVal(req.params, '', 'id');
    res.send(await TaskService.deleteTasks([reqTaskId]));
  } catch (err) {
    next(err);
  }
};

export default deleteTask;
