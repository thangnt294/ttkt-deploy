import {
  RequestHandler, Request, Response, NextFunction
} from 'express';
import Joi from '@hapi/joi';
import BadRequest from '../utils/errors/bad-request';
import logger from '../logger';

interface HandlerOptions {
  validation?: {
    body?: Joi.ObjectSchema | Joi.ArraySchema
  }
};

class RequestMiddleware {
  public getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
    if (!error.details && error.message) {
      return error.message;
    }
    return error.details && error.details.length > 0 && error.details[0].message
      ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
  };

  /**
   * This router wrapper catches any error from async await
   * and throws it to the default express error handler,
   * instead of crashing the app
   * @param handler Request handler to check for error
   */
  // eslint-disable-next-line max-len
  public validateReqBody = (handler: RequestHandler, options?: HandlerOptions): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
    if (options?.validation?.body) {
      const { error } = options?.validation?.body.validate(req.body);
      if (error != null) {
        return next(new BadRequest(this.getMessageFromJoiError(error)));
      }
    }
    return handler(req, res, next);
  };

  public validateBody = (options?: HandlerOptions) => async (req: Request, res: Response, next: NextFunction) => {
    if (options?.validation?.body) {
      const { error } = options?.validation?.body.validate(req.body);
      if (error != null) {
        return next(new BadRequest(this.getMessageFromJoiError(error)));
      }
    }
    return next();
  };

  public pagingReqQuery = (handler: RequestHandler): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.limit) {
      req.query.limit = Number.MAX_SAFE_INTEGER.toString();
    }
    if (!req.query.sort) {
      req.query.sort = 'name_asc';
    }
    return handler(req, res, next);
  }
}
export = new RequestMiddleware();
