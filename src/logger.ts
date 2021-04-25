import {
  createLogger,
  format,
  transports
} from 'winston';
import { hostname } from 'os';

import { Loggly } from 'winston-loggly-bulk';

const logTransports = [];

if (process.env.MODE !== 'SLS-AWS') {
  logTransports.push(
    new transports.File({
      level: 'error',
      filename: './logs/error.log',
      format: format.json({
        replacer: (key, value) => {
          if (key === 'error') {
            return {
              message: (value as Error).message,
              stack: (value as Error).stack
            };
          }
          return value;
        }
      })
    })
  );
  logTransports.push(
    new transports.File({
      level: 'info',
      filename: './logs/info.log',
      format: format.json({
        replacer: (key, value) => {
          if (key === 'info') {
            return {
              message: (value as Error).message,
              stack: (value as Error).stack
            };
          }
          return value;
        }
      })
    })
  );
}

logTransports.push(
  new transports.Console({
    level: 'debug',
    format: format.prettyPrint()
  })
);

// logTransports.push(new Loggly({
//   token: process.env.LOGGY_CUSTOMER_TOKEN,
//   subdomain: 'trames',
//   tags: [`hostname-${hostname()}`, 'app-lando', `stage-${process.env.STAGE}`],
//   json: true
// }));

const logger = createLogger({
  format: format.combine(
    format.timestamp()
  ),
  transports: logTransports,
  defaultMeta: { service: 'api' }
});

export default logger;
