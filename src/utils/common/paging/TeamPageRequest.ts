import { Request } from 'express';
import mongoose from 'mongoose';
import { BasePageRequest, PageRequest } from './BasePageRequest';
import { getVal, isEmpty } from '../../ObjectUtils';

class TeamPageRequest {
  public static getPageRequest(req: Request): PageRequest {
    return {
      query: this.getQuery(req),
      sort: BasePageRequest.getSort(req),
      skip: BasePageRequest.getSkip(req),
      limit: BasePageRequest.getLimit(req),
      projection: this.getProjection(),
      addFields: this.getAddField(req),
      unwind: this.getUnwind(req),
      group: this.getGroup(),
      lookup: this.getLookup()
    };
  }

  public static getQuery(req: Request): any {
    const teamQuery: any = {};
    const reqMemberId: string = getVal(req.query, '', 'memberId');
    const reqTerm: string = getVal(req.query, '', 'term');
    if (!isEmpty(reqTerm)) {
      teamQuery['name'] = new RegExp(`.*${reqTerm.trim()}.*`, 'i');
    }
    if (!isEmpty(reqMemberId)) {
      teamQuery['members.memberId'] = mongoose.Types.ObjectId(reqMemberId);
    }
    return teamQuery;
  }

  public static getProjection(): any {
    return {
      _id: 1,
      name: 1,
      description: 1,
      tasks: 1,
      members: {
        name: 1,
        email: 1,
        avatar: 1,
        _id: 1,
        role: 1
      }
    };
  }

  public static getAddField(req: Request): any {
    const reqMemberId: string = getVal(req.query, '', 'memberId');
    if (!isEmpty(reqMemberId)) {
      return [
        {
          currentMember: {
            $filter: {
              input: '$members',
              as: 'mem',
              cond: {
                $eq: ['$$mem.memberId', mongoose.Types.ObjectId(reqMemberId)]
              }
            }
          }
        },
        {
          currentMemberRole: '$currentMember.role'
        }
      ];
    }
    return {};
  }

  public static getUnwind(req: Request): any {
    const reqMemberId: string = getVal(req.query, '', 'memberId');
    if (!isEmpty(reqMemberId)) {
      return {
        path: '$currentMemberRole'
      };
    }
    return {};
  }

  public static getGroup(): any {
  }

  public static getLookup(): any {
    return {
      from: 'members',
      localField: 'members.memberId',
      foreignField: '_id',
      as: 'members'
    };
  }
}

export { TeamPageRequest };
