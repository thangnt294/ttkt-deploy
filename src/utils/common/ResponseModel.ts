import { isEmpty } from '../ObjectUtils';

export const ResponseModel = (data: any) => {
  if (isEmpty(data)) {
    return { success: false, data };
  }
  return data;
};
