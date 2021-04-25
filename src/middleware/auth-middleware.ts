import { Request, Response, NextFunction } from 'express';
import { checkPassword, validateAccessToken } from '../utils/EncryptUtils';
import Member, { MemberDocument } from '../domain/team/Member';
import MemberService from '../domain/team/service/member-service';
import { UserRegister } from '../domain/auth/payload/UserRegister';
import ApplicationError from '../utils/errors/application-error';
import { ReturnMessage } from '../utils/constant/return-message';
import { HttpStatus } from '../utils/constant/http-status';
import { getVal, isEmpty, isEqual } from '../utils/ObjectUtils';

class AuthMiddleware {
  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.header('Authorization');
    try {
      const decodedToken: UserRegister = await validateAccessToken(token);
      const user: MemberDocument = await MemberService.findMemberByEmail(decodedToken.email);
      Object.assign(req.query, {
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
      return next();
    } catch (err) {
      return next(new ApplicationError(ReturnMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED));
    }
  }

  public throwIfEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = getVal(req.body, '', 'email');
    const emailExists: boolean = (await Member.countDocuments({ email })) > 0;
    if (emailExists) {
      return next(new ApplicationError(ReturnMessage.EMAIL_EXISTS, HttpStatus.BAD_REQUEST));
    }
    return next();
  }

  public throwIfMismatchPassword = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo: UserRegister = req.body;
    const user: MemberDocument = await MemberService.findMemberByEmail(userInfo.email);
    if (isEmpty(user)) {
      return next(new ApplicationError(ReturnMessage.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST));
    }
    const passwordMatch: boolean = await checkPassword(userInfo.password, user.password);
    if (!passwordMatch) {
      return next(new ApplicationError(ReturnMessage.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST));
    }
    return next();
  }
}

export = new AuthMiddleware();
