import * as _ from 'lodash';
import { Types } from 'mongoose';

export const isEmpty = (obj: any) => obj === null
  || obj === ''
  || obj === undefined
  || obj.length === 0
  || (Object.keys(obj).length === 0 && obj.constructor === Object);

export const getVal = (obj: any, defaultValue: any, ...args: any) => args.reduce((obj1: any, level: any) => obj1 && obj1[level], obj) || defaultValue;

export const isEqual = (obj1: any, obj2: any) => obj1 === obj2;

export const isDeepEqual = (obj1: any, obj2: any) => _.isEqual(obj1, obj2);

export const isObjectId = (id: string | number | Types.ObjectId): boolean => {
  if (isEmpty(id)) {
    return false;
  }
  return Types.ObjectId.isValid(id);
};
