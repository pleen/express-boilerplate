import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import { User } from './entities/user.entity';
import errorMiddleware from './middlewares/error.middleware';
import wrongPathMiddleware from './middlewares/wrongPath.middleware';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json()); // body를 json 파싱
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(cors({ origin: true, credentials: true })); //cors 처리
    app.use(hpp());
    app.use(helmet());
    app.use(compression());
    app.use(express.urlencoded({ extended: true }));

    // catch 404 and forward to error handler
    app.use(wrongPathMiddleware);
    // error handler
    app.use(errorMiddleware);
  })
  .catch((error) => console.log(error));
