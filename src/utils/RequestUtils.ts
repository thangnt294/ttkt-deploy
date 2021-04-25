import { Request } from 'express';
import { getVal, isEmpty } from './ObjectUtils';

export const appendQueryToReq = (req:Request, objParam: object) => {
  if (isEmpty(req.query)) {
    req.query = {};
  }
  if (!isEmpty(objParam)) {
    Object.assign(req.query, objParam);
  }
};

export const appendBodyToReq = (req:Request, objParam: object) => {
  if (isEmpty(req.body)) {
    req.body = {};
  }
  if (!isEmpty(objParam)) {
    Object.assign(req.body, objParam);
  }
};

export const getCurrentUserId = (req: Request) : string => getVal(req.query, '', 'userInfo', 'id');
