import { RequestHandler, Request, Response } from 'express';
import AuthService from '../../domain/auth/auth-service';
import { getVal } from '../../utils/ObjectUtils';

export const changePassword: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const reqEmail: string = getVal(req.body, '', 'email');
    const reqNewPassword: string = getVal(req.body, '', 'newPassword');
    res.send(await AuthService.changePassword(reqEmail, reqNewPassword));
  } catch (err) {
    next(err);
  }
};
