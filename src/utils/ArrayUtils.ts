import * as _ from 'lodash';
import { isEmpty } from './ObjectUtils';

export const arrayEquals = (a: any [], b: any []): boolean => Array.isArray(a)
        && Array.isArray(b)
        && a.length === b.length
        && a.every((val, index) => val === b[index]);

export const isDuplicateValueInStringArray = (strings: string[]): boolean => new Set(strings).size !== strings.length;

export const isDuplicate = (array: any[], item: any): boolean => array.some(el => el === item);

export const copyArray = (array: any[] | Set<any>) => {
  if (isEmpty(array)) {
    return [];
  }
  return [...array];
};

export const uniqueStringArray = (arr: string[]): string[] => {
  const j: any = {};
  arr.forEach(v => {
    j[`${v}::${typeof v}`] = v;
  });
  return Object.keys(j).map(v => j[v]);
};

export const toArrayString = (string: any): string[] => {
  // TODO: validate if undefined
  if (typeof string === 'string') {
    return [string];
  }
  return string;
};

export const toArray = <T>(data : T[]): T[] => {
  if (isEmpty(data)) {
    return [];
  }
  return data;
};

export const uniqueArray = (arr: any[]) => _.uniqWith(arr, _.isEqual);

/**
 * @return true if  item be included in an Array
 * @return false if array/item is empty or item not be included in an array.
 */
export const isAnyMatch = <T>(arr: T[], itemToCheck: T): boolean => {
  if (isEmpty(arr) || isEmpty(itemToCheck)) {
    return false;
  }
  return arr.includes(itemToCheck);
};

export const groupArrayByField = (arr: any[], field: string): any => arr.reduce((obj, curr) => {
  const result = obj as any;
  (result[curr[field]] = result[curr[field]] || []).push(curr);
  return result;
}, {});
