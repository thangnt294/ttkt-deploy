import { Request, RequestHandler, Response } from 'express';
import AuthService from '../../domain/auth/auth-service';

export const getUserInfo: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const reqToken: string = req.header('Authorization');
    res.send(await AuthService.getUserInfo(reqToken));
  } catch (err) {
    next(err);
  }
};
