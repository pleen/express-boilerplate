import path from 'path';
import { Logger, QueryRunner } from 'typeorm';
import { createLogger, Logger as WinstonLogger, format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

// logs dir
const logDir: string = path.join('logs');
// const logDir: string = path.join(rootDir, 'logs');

export class OrmLogger implements Logger {
  private readonly queryLogger: WinstonLogger;
  private readonly customFormat: any;
  constructor() {
    this.customFormat = format.printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`);

    const options = {
      transports: new winstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/orm', // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30,
        json: false,
        zippedArchive: true,
      }),
      format: this.customFormat,
    };

    this.queryLogger = createLogger(options);
  }
  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'debug',
      message: `${query} - ${JSON.stringify(parameters)}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }

  logQueryError(error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'error',
      message: `${error} - ${query} - ${JSON.stringify(parameters)}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }

  logQuerySlow(_time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'debug',
      message: `${query} - ${JSON.stringify(parameters)}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'debug',
      message,
      timestamp: Date.now(),
      label: 'schema',
    });
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: 'debug',
      message: `${message}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }

  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: QueryRunner) {
    this.queryLogger.log({
      level: level,
      message: `${message}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }
}
