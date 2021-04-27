import { Request } from 'express';
import mongoose from 'mongoose';
import { BasePageRequest, PageRequest } from './BasePageRequest';
import { getVal, isEmpty, isEqual } from '../../ObjectUtils';
import { getCurrentUserId } from '../../RequestUtils';
import { toUpperCase } from '../../StringUtils';

class TaskPageRequest {
  public static getPageRequest(req: Request, taskIds: string[] = null): PageRequest {
    return {
      query: this.getQuery(req, taskIds),
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

  public static getQuery(req: Request, taskIds: string[] = null): any {
    const query: any = {};
    const reqUserId: string = getCurrentUserId(req);
    if (taskIds) {
      query['_id'] = {
        $in: taskIds
      };
      const reqTab: string = getVal(req.query, '', 'tab');
      if (isEqual(toUpperCase(reqTab), 'MINE')) {
        query['base.createdBy'] = mongoose.Types.ObjectId(reqUserId);
      }
    } else {
      query['assignee'] = mongoose.Types.ObjectId(reqUserId);
    }
    const queryTerm = getVal(req.query, '', 'term');
    if (!isEmpty(queryTerm)) {
      query['name'] = new RegExp(`.*${queryTerm.trim()}.*`, 'i');
    }
    return query;
  }

  public static getProjection(): any {
    return {
      name: 1,
      description: 1,
      assignee: 1,
      status: 1,
      dueDate: 1,
      base: 1,
      team: {
        _id: 1,
        name: 1,
        description: 1
      }
    };
  }

  public static getSort(): any {
    return {
      'base.updatedDate': 1
    };
  }

  public static getAddField(): any {
    return {};
  }

  public static getUnwind(): any[] {
    return [
      {
        path: '$team'
      },
      {
        path: '$assignee'
      }
    ];
  }

  public static getGroup(): any {
    return {};
  }

  public static getLookup(): any[] {
    return [
      {
        from: 'teams',
        localField: '_id',
        foreignField: 'tasks',
        as: 'team'
      },
      {
        from: 'members',
        localField: 'assignee',
        foreignField: '_id',
        as: 'assignee'
      }
    ];
  }
}

export { TaskPageRequest };
