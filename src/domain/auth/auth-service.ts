import MemberService from '../team/service/member-service';
import { UserRegister } from './payload/UserRegister';
import { generateAccessToken, hashPassword, validateAccessToken } from '../../utils/EncryptUtils';
import { MemberDocument } from '../team/Member';

class AuthService {
  public register = async (user: UserRegister) => {
    const hashedPassword: string = await hashPassword(user.password);
    return MemberService.createMember({
      ...user,
      password: hashedPassword
    });
  }

  public login = async (email: string): Promise<any> => {
    const user: MemberDocument = await MemberService.findMemberByEmail(email);
    const tokenData: UserRegister = {
      name: user.name,
      email: user.email
    } as UserRegister;
    return {
      accessToken: await generateAccessToken(tokenData),
      accessTokenExpiration: 86400
    };
  }

  public changePassword = async (reqEmail: string, reqNewPassword: string) => {
    const hashedNewPassword: string = await hashPassword(reqNewPassword);
    return MemberService.changePassword(reqEmail, hashedNewPassword);
  }

  public getUserInfo = async (reqToken: string) => {
    const decodedToken: UserRegister = await validateAccessToken(reqToken);
    const user: MemberDocument = await MemberService.findMemberByEmail(decodedToken.email);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
  }
}

export default new AuthService();
