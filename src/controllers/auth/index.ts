import Joi from '@hapi/joi';
import { register } from './register';
import { login } from './login';
import { changePassword } from './changePassword';
import { getUserInfo } from './getUserInfo';

export {
  register,
  login,
  changePassword,
  getUserInfo
};

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required().max(200),
  name: Joi.string().required().max(200),
  password: Joi.string().required().max(200)
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required().max(200),
  password: Joi.string().required().max(200)
});

export const changePasswordSchema = Joi.object().keys({
  email: Joi.string().email().required().max(200),
  password: Joi.string().required().max(200),
  newPassword: Joi.string().required().max(200)
});
