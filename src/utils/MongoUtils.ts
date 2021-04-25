import { MongoError } from './constant/MongoError';

export const indexIsNotUnique = (err: any) : boolean => (err.code === MongoError.INDEX_IS_NOT_UNIQUE);
