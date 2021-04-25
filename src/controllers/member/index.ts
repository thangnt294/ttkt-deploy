import Joi from '@hapi/joi';
import { find, findDetail } from './find';
import update from './update';
import { leaveTeam } from './leaveTeam';
import { deleteAccount } from './delete';

export const createMemberSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  avatar: Joi.string()
});

export {
  find,
  update,
  findDetail,
  deleteAccount,
  leaveTeam
};
