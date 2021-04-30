import {
  Document, Model, model, Schema
} from 'mongoose';
import BaseSchema, { AuditDocument } from '../../models/common.schema/BaseSchema';
import { TaskStatus } from '../../utils/constant/TaskStatus';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';

export class TaskDocument extends Document {
  name: string;

  description: string;

  assignee: string;

  status: TaskStatus;

  dueDate: Number;

  base: AuditDocument;
}

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  assignee: { type: Schema.Types.ObjectId, required: false },
  status: { type: String, required: true },
  dueDate: { type: Number, required: true },
  base: { type: BaseSchema }
});

export const Task: Model<TaskDocument> = model<TaskDocument, Model<TaskDocument>>('Task', schema);

export const FindTasks = async (pageRequest: PageRequest) => Task.aggregate()
  .match(pageRequest.query)
  .lookup(pageRequest.lookup[0])
  .lookup(pageRequest.lookup[1])
  .unwind(pageRequest.unwind[0])
  .unwind(pageRequest.unwind[1])
  .project(pageRequest.projection)
  .sort(pageRequest.sort)
  .skip(pageRequest.skip)
  .limit(pageRequest.limit);

export const DeleteTasks = async (taskIds: string[]) => Task.deleteMany({
  _id: {
    $in: taskIds
  }
});

export const DeleteTasksCreatedByUser = async (reqMemberId: string) => Task.deleteMany({ 'base.createdBy': reqMemberId });

export const FindTasksAssignedToMember = async (reqMemberId: string): Promise<TaskDocument[]> => Task.find({ assignee: reqMemberId }).lean();

export const RemoveTaskAssignees = async (taskIds: string[]): Promise<any> => Task.updateMany({
  _id: {
    $in: taskIds
  }
},
{
  assignee: null
});

export default Task;
