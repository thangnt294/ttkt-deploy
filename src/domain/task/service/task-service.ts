import Task, {
  DeleteTasks, FindTasks, TaskDocument, UpdateTask
} from '../Task';
import TeamService from '../../team/service/team-service';
import { AuditDocument } from '../../../models/common.schema/BaseSchema';
import { PageRequest } from '../../../utils/common/paging/BasePageRequest';

class TaskService {
  public deleteTasks = async (taskIds: string[]) => DeleteTasks(taskIds);

  public createTask = async (reqTaskInfo: TaskDocument, reqTeamId: string, reqUserId: string) => {
    const task: TaskDocument = new Task(reqTaskInfo);
    task.base = {
      createdBy: reqUserId,
      updatedBy: reqUserId
    } as AuditDocument;
    const newTask: TaskDocument = await task.save();
    const newTaskId: string = newTask._id.toString();
    return TeamService.addTaskToTeam(reqTeamId, newTaskId);
  }

  public updateTask = async (reqTaskId: string, reqTaskInfo: TaskDocument) => UpdateTask(reqTaskId, reqTaskInfo)

  public findTasks = async (pageRequest: PageRequest) => Promise.all([FindTasks(pageRequest), Task.countDocuments(pageRequest.query)])
}

export default new TaskService();
