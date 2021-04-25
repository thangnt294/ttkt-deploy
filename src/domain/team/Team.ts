import {
  Document, Model, model, Schema
} from 'mongoose';
import { MemberTeamInfo } from './payload/MemberTeamInfo';
import MemberTeamSchema from '../../models/common.schema/MemberTeamSchema';
import { nowAsMillis } from '../../utils/DateTimeUtils';
import { PageRequest } from '../../utils/common/paging/BasePageRequest';
import BaseSchema, { AuditDocument } from '../../models/common.schema/BaseSchema';

export class TeamDocument extends Document {
  name: string;

  description: string;

  members: Array<MemberTeamInfo>;

  tasks: Array<string>;

  base: AuditDocument;
}

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: MemberTeamSchema }],
  tasks: [{ type: Schema.Types.ObjectId }],
  base: { type: BaseSchema }
});

const Team: Model<TeamDocument> = model<TeamDocument, Model<TeamDocument>>('Team', schema);

export const FindTeamsByMemberId = async (memberId: string): Promise<TeamDocument[]> => Team.find({
  'members.memId': memberId
}).lean();

export const FindTeams = async (pageRequest: PageRequest) => Team.aggregate()
  .match(pageRequest.query)
  .lookup(pageRequest.lookup)
  .project(pageRequest.projection)
  .sort(pageRequest.sort)
  .skip(pageRequest.skip)
  .limit(pageRequest.limit);

export const FindTeamsOfUser = async (pageRequest: PageRequest) => Team.aggregate()
  .match(pageRequest.query)
  .addFields(pageRequest.addFields[0])
  .addFields(pageRequest.addFields[1])
  .unwind(pageRequest.unwind)
  .lookup(pageRequest.lookup)
  .project(pageRequest.projection)
  .sort(pageRequest.sort)
  .skip(pageRequest.skip)
  .limit(pageRequest.limit);

export const UpdateTeam = async (
  reqTeamId: string,
  reqTeamName: string,
  reqTeamDescription: string,
  currentUserId: string
) => Team.findByIdAndUpdate(reqTeamId, {
  name: reqTeamName,
  description: reqTeamDescription,
  'base.updatedBy': currentUserId,
  'base.updatedDate': nowAsMillis()
}, {
  new: true
});

export const DeleteTeam = async (reqTeamId: string) => Team.findByIdAndDelete(reqTeamId);

export const RemoveMembersFromTeam = async (reqMemberIds: string[], reqTeamId: string) => Team.updateOne({ _id: reqTeamId }, {
  $pull: {
    members: {
      memberId: {
        $in: reqMemberIds
      }
    }
  }
});

export const RemoveMembersFromAllTeam = async (reqMemberIds: string[]) => Team.updateMany({}, {
  $pull: {
    members: {
      memberId: {
        $in: reqMemberIds
      }
    }
  }
});

export const MemberLeaveTeam = async (
  reqTeamId: string,
  reqMemberId: string
): Promise<any> => Team.findByIdAndUpdate(reqTeamId, {
  $pull: {
    members: {
      memberId: reqMemberId
    }
  }
});

export const AddMembersToTeam = async (
  reqTeamId: string,
  reqMemberTeamInfos: MemberTeamInfo[]
): Promise<any> => Team.findByIdAndUpdate(reqTeamId, {
  $push: {
    members: {
      $each: reqMemberTeamInfos
    }
  }
});

export const UpdateMemberRole = async (
  reqTeamId: string,
  reqMemberInfo: MemberTeamInfo
): Promise<any> => Team.updateOne({
  _id: reqTeamId,
  'members.memberId': reqMemberInfo.memberId
}, {
  $set: {
    'members.$': reqMemberInfo
  }
});

export const AddTaskToTeam = async (
  teamId: string,
  taskId: string
): Promise<any> => Team.findByIdAndUpdate(teamId, {
  $push: {
    tasks: taskId
  }
});

export default Team;
