import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isEmpty } from './ObjectUtils';
import { toArray } from './ArrayUtils';

export const encrypt = (inputs: string[]): string => {
  const value: string = toArray(inputs).filter(input => !isEmpty(input)).reduce((output, input) => output + input);
  return crypto.createHash('sha512').update(value).digest('base64');
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const checkPassword = async (
  password: string,
  userHashedPassword: string
): Promise<boolean> => bcrypt.compare(password, userHashedPassword);

export const generateAccessToken = async (data: any): Promise<string> => jwt.sign(data, 'someSecret', { expiresIn: '24h' });

export const validateAccessToken = async (token: string): Promise<any> => jwt.verify(token, 'someSecret');
