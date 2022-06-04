import 'reflect-metadata';
import express from 'express';
import { createExpressServer } from 'routing-controllers';
import connectDatabase from './helpers/db';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { json } from 'body-parser';
import { MongoClient } from 'mongodb';
import { startDb } from './helpers/startDb';

const PORT = process.env.PORT || 8080;

dotenv.config({
  path: './.env',
});

express().use(express.json());
express().use(express.urlencoded({ extended: true }));
express().use(cors());

const app = createExpressServer({
  cors: {
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
  },
  defaultErrorHandler: false,
  routePrefix: '/api',
  controllers: [path.join(__dirname + '/controllers/*ts'), path.join(__dirname + '/controllers/*js')],
  middlewares: [path.join(__dirname + '/middlewares/*.ts'), path.join(__dirname + '/middlewares/*js')],
});

app.use(express.static(__dirname + '/public'));

export const mongodbClient = new MongoClient('mongodb://localhost:27017');

const connect = async () => {
  try {
    await mongodbClient.connect();
    console.log('connected to mongo');
    startDb(mongodbClient.db('beauty-center'));
  } catch (error) {
    console.log(error);
  }
};

connect();
// fonksiyonunun aldığı obje parametresi bütün controllerları tek satırda init ediyor.
connectDatabase();

app.use(express.json());
app.use(json());
const swaggerFilePath = async () => await import(path.resolve(__dirname, '..', 'swagger_output.json'));
swaggerFilePath().then((jsonFile) => app.use('/doc', swaggerUi.serve, swaggerUi.setup(jsonFile)));

app.listen(PORT, () => {
  console.log('server started');
});
