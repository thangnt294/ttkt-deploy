import { Schema } from 'mongoose';

const MemberTeamSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
  role: {
    type: String,
    required: true,
    enum: { values: ['OWNER', 'ADMIN', 'MEMBER'] }
  }
});

export default MemberTeamSchema;
