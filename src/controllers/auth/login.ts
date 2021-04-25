import { RequestHandler, Request, Response } from 'express';
import AuthService from '../../domain/auth/auth-service';
import { getVal } from '../../utils/ObjectUtils';

export const login: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const email = getVal(req.body, '', 'email');
    res.send(await AuthService.login(email));
  } catch (err) {
    next(err);
  }
};
