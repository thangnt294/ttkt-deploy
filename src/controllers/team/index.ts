import Joi from '@hapi/joi';
import create from './create';
import {
  find,
  findDetail
} from './find';
import deleteTeam from './delete';
import update from './update';
import addMembers from './addMembers';
import removeMembers from './removeMembers';
import updateMemberRole from './updatememberRole';
import { findMembers } from './findMembers';

export const createTeamSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  members: Joi.array().required().items({
    memberId: Joi.string().required(),
    role: Joi.string().required()
  })
});

export const updateTeamSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required()
});

export const addMembersSchema = Joi.object().keys({
  members: Joi.array().items({
    memberId: Joi.string().required(),
    role: Joi.string().required()
  })
});

export const removeMembersSchema = Joi.object().keys({
  memberIds: Joi.array().items(Joi.string().required()).required()
});

export const updateMemberRoleSchema = Joi.object().keys({
  memberId: Joi.string().required(),
  role: Joi.string().required()
});

export {
  create, find, update, deleteTeam, findDetail, addMembers, removeMembers, updateMemberRole, findMembers
};
