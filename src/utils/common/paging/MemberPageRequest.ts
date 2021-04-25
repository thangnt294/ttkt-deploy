import { Request } from 'express';
import mongoose from 'mongoose';
import { BasePageRequest, PageRequest } from './BasePageRequest';
import { getVal, isEmpty } from '../../ObjectUtils';

class MemberPageRequest {
  public static getPageRequest(req: Request, memberIds: mongoose.Types.ObjectId[] = null): PageRequest {
    return {
      query: this.getQuery(req, memberIds),
      sort: this.getSort(),
      skip: BasePageRequest.getSkip(req),
      limit: BasePageRequest.getLimit(req),
      projection: this.getProjection(),
      addFields: this.getAddField(),
      unwind: this.getUnwind(),
      group: this.getGroup(),
      lookup: this.getLookup()
    };
  }

  public static getQuery(req: Request, memberIds: mongoose.Types.ObjectId[]): any {
    const query: any = {};
    const queryTerm = getVal(req.query, '', 'term');
    if (!isEmpty(queryTerm)) {
      const term = new RegExp(`.*${queryTerm.trim()}.*`, 'i');
      query['$or'] = [
        { name: term },
        { email: term }
      ];
    }
    if (!isEmpty(memberIds)) {
      query['_id'] = {
        $in: memberIds
      };
    }
    return query;
  }

  public static getProjection(): any {
    return {
      _id: 1,
      name: 1,
      email: 1,
      avatar: 1
    };
  }

  public static getSort(): any {
    return {
      name: 1
    };
  }

  public static getAddField(): any {
    return {};
  }

  public static getUnwind(): any {
    return {};
  }

  public static getGroup(): any {
    return {};
  }

  public static getLookup(): any {
    return {};
  }
}

export { MemberPageRequest };
