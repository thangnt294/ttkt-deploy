import { RequestHandler, Request, Response } from 'express';
import AuthService from '../../domain/auth/auth-service';
import { UserRegister } from '../../domain/auth/payload/UserRegister';

export const register: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const user: UserRegister = req.body;
    res.send(await AuthService.register(user).then(() => 'Registration Successful'));
  } catch (err) {
    next(err);
  }
};
