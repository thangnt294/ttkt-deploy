import { isEmpty } from './ObjectUtils';

export const toUpperCase = (input: string) : string => {
  if (isEmpty(input)) {
    return '';
  }
  return input.toUpperCase();
};

export const toLowerCase = (input: string) : string => {
  if (isEmpty(input)) {
    return '';
  }
  return input.toLowerCase();
};
