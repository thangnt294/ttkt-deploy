import Joi from '@hapi/joi';
import create from './create';
import update from './update';
import deleteTask from './delete';
import { findMyTasks, findTeamTasks } from './find';

export const createTaskSchema = Joi.object().keys({
  teamId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  assignee: Joi.string().required(),
  status: Joi.string().required(),
  dueDate: Joi.number().required()
});

export const updateTaskSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  assignee: Joi.string().required(),
  status: Joi.string().required(),
  dueDate: Joi.number().required()
});

export {
  create,
  update,
  deleteTask,
  findMyTasks,
  findTeamTasks
};
