import express from 'express';
import { HttpException } from '../exceptions/httpException';

/** Route되지 않은 경로 접근시 처리하는 미들웨어 */
const wrongPathMiddleware = (_: express.Request, _res: express.Response) => {
  throw new HttpException(404, '잘못된 경로입니다.');
};

export default wrongPathMiddleware;
