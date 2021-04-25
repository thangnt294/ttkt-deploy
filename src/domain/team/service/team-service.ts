import Team, {
  AddMembersToTeam, AddTaskToTeam,
  DeleteTeam, FindTeams,
  FindTeamsByMemberId, FindTeamsOfUser,
  RemoveMembersFromAllTeam,
  RemoveMembersFromTeam,
  TeamDocument,
  UpdateMemberRole,
  UpdateTeam
} from '../Team';
import { isEqual } from '../../../utils/ObjectUtils';
import { MemberTeamInfo } from '../payload/MemberTeamInfo';
import TaskService from '../../task/service/task-service';
import { PageRequest } from '../../../utils/common/paging/BasePageRequest';
import { MemberTeamRole } from '../../../utils/constant/MemberTeamRole';
import { AuditDocument } from '../../../models/common.schema/BaseSchema';

class TeamService {
  public findTeamsByMemberId = async (memberId: string) => FindTeamsByMemberId(memberId)

  public findTeams = async (pageRequest: PageRequest) => Promise.all([FindTeams(pageRequest), Team.countDocuments(pageRequest.query)])

  public findTeamsOfUser = async (pageRequest: PageRequest) => Promise.all([FindTeamsOfUser(pageRequest), Team.countDocuments(pageRequest.query)])

  public createTeam = async (teamInfo: TeamDocument, reqUserId: string) => {
    const team = new Team(teamInfo);
    team.base = {
      createdBy: reqUserId,
      updatedBy: reqUserId
    } as AuditDocument;
    return team.save();
  }

  public updateTeam = async (
    reqTeamId: string,
    reqTeamInfo: TeamDocument,
    currentUserId: string
  ) => UpdateTeam(reqTeamId, reqTeamInfo.name, reqTeamInfo.description, currentUserId)

  public deleteTeam = async (reqTeamId: string) => {
    const teamTaskIds: string[] = (await Team.findById(reqTeamId).lean()).tasks;
    return Promise.all([
      DeleteTeam(reqTeamId),
      TaskService.deleteTasks(teamTaskIds)
    ]);
  }

  public removeMembersFromTeam = async (reqMemberIds: string[], reqTeamId: string = null): Promise<any> => {
    if (reqTeamId) {
      return RemoveMembersFromTeam(reqMemberIds, reqTeamId);
    }
    return RemoveMembersFromAllTeam(reqMemberIds);
  }

  public getMemberRoleInTeam = (
    reqMemberId: string,
    teamMembers: MemberTeamInfo[]
  ): MemberTeamRole => teamMembers.find(member => isEqual(member.memberId.toString(), reqMemberId.toString()))?.role

  public addMembersToTeam = async (
    reqTeamId: string,
    reqMemberTeamInfos: MemberTeamInfo[]
  ) => AddMembersToTeam(reqTeamId, reqMemberTeamInfos)

  public updateMemberRole = async (
    reqTeamId: string,
    reqMemberInfo: MemberTeamInfo
  ) => UpdateMemberRole(reqTeamId, reqMemberInfo);

  public addTaskToTeam = async (
    teamId: string,
    taskId: string
  ) => AddTaskToTeam(teamId, taskId)
}

export default new TeamService();
