import * as mongoose from 'mongoose';
import { PageRequest } from '../../../utils/common/paging/BasePageRequest';
import Member, {
  ChangePassword, DeleteAccount, FindMemberInfo, FindMembers, MemberDocument, UpdateMember
} from '../Member';
import {MemberInfo, TeamOfMemberInfo} from '../payload/MemberInfo';
import { UserRegister } from '../../auth/payload/UserRegister';
import { MemberLeaveTeam } from '../Team';
import { DeleteTasksCreatedByUser, FindTasksAssignedToMember, RemoveTaskAssignees } from '../../task/Task';
import TeamService from './team-service';
import {isEqual} from "../../../utils/ObjectUtils";

class MemberService {
  public findMembers = async (pageRequest: PageRequest): Promise<any> => Promise.all([
    FindMembers(pageRequest),
    Member.countDocuments(pageRequest.query)
  ]);

  public findMemberInfo = async (memberId: mongoose.Types.ObjectId): Promise<MemberInfo> => {
    const memberInfo: MemberInfo[] = await FindMemberInfo(memberId);
    memberInfo[0].teams = memberInfo[0].teams.map(({members, ...team}) => ({
      ...team,
      role: members.find(member => isEqual(member.memberId.toString(), memberInfo[0]._id.toString()))?.role
    } as TeamOfMemberInfo))

    return memberInfo[0];
  }

  public findMemberByEmail = async (email: string): Promise<MemberDocument> => Member.findOne({
    email
  }).lean();

  public createMember = async (memberInfo: UserRegister): Promise<any> => {
    const member = new Member(memberInfo);
    member.avatar = 'https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/'
      + '54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w';
    return member.save();
  }

  public updateMember = async (reqMemberId: string, reqMemberInfo: MemberDocument) => UpdateMember(reqMemberId, reqMemberInfo)

  public deleteAccount = async (reqMemberId: string) => {
    const taskIds: string[] = (await FindTasksAssignedToMember(reqMemberId)).map(task => task._id);
    return Promise.all([
      DeleteAccount(reqMemberId),
      DeleteTasksCreatedByUser(reqMemberId),
      RemoveTaskAssignees(taskIds),
      TeamService.removeMembersFromTeam([reqMemberId])
    ]);
  }

  public changePassword = async (reqEmail: string, reqNewPasswordHashed: string) => ChangePassword(reqEmail, reqNewPasswordHashed)

  public leaveTeam = async (reqTeamId: string, reqUserId: string) => MemberLeaveTeam(reqTeamId, reqUserId)
}

export default new MemberService();
