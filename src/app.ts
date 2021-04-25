import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import routes from './routes';
import { GlobalExceptionHandler } from './middleware/global-exception-handler';
import MongoConnection from './mongo-connection';

// global configuration axios
axios.defaults.timeout = 30 * 1000;

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, '../', 'client', 'build')));


// load mongodb - START
const mongoConnection = new MongoConnection('mongodb+srv://group6:nhom6@cluster0.urxyw.mongodb.net/myDatabase?retryWrites=true&w=majority');
mongoConnection.connect(() => {
  console.log('Connected to MongoDB');
});
// load mongodb - ENDs

app.listen(port, (): void => {
  console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
    `🌏 Express server started at http://localhost:${port}`);
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/api', routes);
app.use(GlobalExceptionHandler.exceptionHandle);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
});

export default app;
