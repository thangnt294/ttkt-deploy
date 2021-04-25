// /* eslint-disable import/first */
//
// // !!! WARNING
// //  This file will not be run during serverless mode. The app.js file is
// //  directly converted into a handler that is invoked by the serverless
// //  orchestrator. THerefore, ensure that anything done, here as part of
// //  server warm up is loaded at controllers if not available.
//
// // import dotenv from 'dotenv';
//
// // const result = dotenv.config();
// // if (result.error) {
// //   dotenv.config({ path: '.env' });
// // }
//
// import app from './app';
// import MongoConnection from './mongo-connection';
// import logger from './logger';
//
// const mongoConnection = new MongoConnection(process.env.MONGO_URL);
//
// if (process.env.MONGO_URL == null) {
//   logger.log({
//     level: 'error',
//     message: 'MONGO_URL not specified in environment'
//   });
//   process.exit(1);
// } else {
//   mongoConnection.connect(() => {
//     app.listen(app.get('port'), (): void => {
//       console.log('Deployment stage: ', process.env.MONGO_URL);
//       console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
//         `🌏 Express server started at http://localhost:${app.get('port')}`);
//       if (process.env.NODE_ENV === 'development') {
//         console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
//           `⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs`);
//       }
//     });
//   });
// }
//
// // Close the Mongoose connection, when receiving SIGINT
// process.on('SIGINT', () => {
//   logger.info('Gracefully shutting down');
//   mongoConnection.close(err => {
//     if (err) {
//       logger.log({
//         level: 'error',
//         message: 'Error shutting closing mongo connection',
//         error: err
//       });
//     }
//     process.exit(0);
//   });
// });
//
// process.on('uncaughtException', e => {
//   logger.error(e);
// });
// process.on('unhandledRejection', e => {
//   logger.error(e);
// });
