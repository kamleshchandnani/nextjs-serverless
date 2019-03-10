const next = require('next');
const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const helmet = require('helmet');
const compression = require('compression');

const nextApp = next({
  dev: process.env.STAGE === 'local',
});

const requestHandler = nextApp.getRequestHandler();

const server = express();
server.set('trust proxy', true);
server.use(helmet({ dnsPrefetchControl: false }));
server.use(compression());
server.use('/health', (req, res) => res.send({ 'nextjs-serverless': true }));

server.get('/test', (req, res) => nextApp.render(req, res, '/test'));
server.get('*', (req, res) => requestHandler(req, res));

exports.handler = (event, context, callback) => {
  // this goes into infinite loop
  nextApp.prepare()
    .then(() => awsServerlessExpress.proxy(
      awsServerlessExpress.createServer(server),
      event,
      context,
    ));
};
