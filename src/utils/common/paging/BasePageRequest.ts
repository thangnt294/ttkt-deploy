/* eslint-disable radix */
import { Request } from 'express';
import logger from '../../../logger';

interface PageRequest {
  query: any
  sort: any
  skip: number
  limit: number,
  projection: any,
  addFields: any,
  unwind: any,
  group: any,
  lookup: any
}

class BasePageRequest {
  public static getSort(req: Request) : any {
    logger.info('Building sort schema');
    const sortSchema : any = {};
    if (!req.query.sort) {
      return sortSchema;
    }
    if ((Array.isArray(req.query.sort))) {
      const sorts = [...req.query.sort];
      sorts.forEach(el => {
        const arr = el.toString().split('_');
        if (arr[1].toUpperCase() === 'ASC') {
          sortSchema[arr[0]] = 1;
        } else {
          sortSchema[arr[0]] = -1;
        }
      });
    } else {
      const arr = req.query.sort.toString().split('_');
      return this.parseSort(arr);
    }
    return sortSchema;
  }

  public static getSkip(req: Request): number {
    const currentPage = req.query.page ? Number.parseInt(req.query.page.toString(), 10).valueOf() : 0;
    const limit = req.query.limit ? Number.parseInt(req.query.limit.toString(), 10).valueOf() : 0;
    return currentPage * limit;
  }

  public static getLimit(req: Request): number {
    if (req.query.limit) {
      return Number.parseInt(req.query.limit.toString(), 10).valueOf();
    }
    return 0;
  }

  public static parseSort(arr: string []) {
    const sortSchema: any = {};
    if (arr[1].toUpperCase() === 'ASC') {
      sortSchema[arr[0]] = 1;
    } else {
      sortSchema[arr[0]] = -1;
    }
    return sortSchema;
  }
}
export { PageRequest, BasePageRequest };
