import serverless from 'serverless-http';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { performance } from 'perf_hooks';
import logger from './logger';
import MongoConnection from './mongo-connection';
import app from '../app';
import { getJsonSecret } from './utils/secretsUtil';

if (process.env.MODE === 'SLS-AWS') {
  const handlerAuto = serverless(app);
  module.exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
    const startTime = performance.now();
    context.callbackWaitsForEmptyEventLoop = false;

    // load mongodb - START
    const mongoConnection = new MongoConnection(await getJsonSecret('MONGO_URL'));
    mongoConnection.connect(() => {
      app.listen(app.get('port'), (): void => {
        console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
          `🌏 Express server started at http://localhost:${3000}`);
        if (process.env.NODE_ENV === 'development') {
          console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
            `⚙️  Swagger UI hosted at http://localhost:${3000}/dev/api-docs`);
        }
      });
    });
    // load mongodb - END

    const dbTime = performance.now();

    const result = await handlerAuto(event, context);
    // and here
    const endTime = performance.now();
    logger.info(`actual-handler-execution-time: ${endTime - startTime} ms`);
    logger.info(`db-handler-execution-time: ${dbTime - startTime} ms`);
    logger.info(`function-handler-execution-time: ${endTime - dbTime} ms`);
    return result;
  };
}
