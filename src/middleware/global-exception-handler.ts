import { Request, Response } from 'express';
import ApplicationError from '../utils/errors/application-error';

class GlobalExceptionHandler {
  public static exceptionHandle(err: ApplicationError, req: Request, res: Response, next: any) {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'development' ? err : undefined,
      message: err.message
    });
  }
}

export { GlobalExceptionHandler };
