import { Request } from 'express';
import logger from '../../../logger';

interface Page<T>{
  currentPage: number,
  totalPage: number,
  totalItems: number
  items: Array<T>
}

class PageableExecutionUtils {
  public static getPage<T>(items: Array<T>, request: Request, totalItems: number) : Page<T> {
    logger.debug('Building a pageResponse ....');
    const { page, limit } = request.query;
    const currentPage = Number(page) || 0;
    const noOfItemsPerPage = Number(limit) || 1;
    const totalPage = Math.ceil(totalItems / noOfItemsPerPage);

    return {
      currentPage,
      totalPage,
      totalItems,
      items
    };
  }
}

export { Page, PageableExecutionUtils };
