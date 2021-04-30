import Task, {
  DeleteTasks, FindTasks, TaskDocument
} from '../Task';
import TeamService from '../../team/service/team-service';
import { AuditDocument } from '../../../models/common.schema/BaseSchema';
import { PageRequest } from '../../../utils/common/paging/BasePageRequest';
import { isEmpty } from '../../../utils/ObjectUtils';

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

  public updateTask = async (reqTaskId: string, reqTaskInfo: TaskDocument) => {
    const task: TaskDocument = await Task.findById(reqTaskId);
    task.name = reqTaskInfo.name;
    task.assignee = reqTaskInfo.assignee;
    task.description = reqTaskInfo.description;
    task.dueDate = reqTaskInfo.dueDate;
    if (!isEmpty(reqTaskInfo.status)) {
      task.status = reqTaskInfo.status;
    }

    await task.save();
  }

  public findTasks = async (pageRequest: PageRequest) => Promise.all([FindTasks(pageRequest), Task.countDocuments(pageRequest.query)])
}

export default new TaskService();
