import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/httpException';
import { logger } from '../loggers/logger';

/**
 * 전역 오류를 처리하기 위한 미들웨어
 * 요청 처리중 throw Error 발생시 errorMiddleware에서 처리한다.
 * */
const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode: ${status}, Message: ${message}`
    );
    logger.error(error.stack);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
