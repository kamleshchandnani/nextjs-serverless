import next from 'next';
import express from 'express';
import awsServerlessExpress from 'aws-serverless-express';
import helmet from 'helmet';
import compression from 'compression';
// import cookieParser from 'cookie-parser';

const nextApp = next({
  dev: __STAGE__ === 'local',
});

const requestHandler = nextApp.getRequestHandler();

const server = express();
server.set('trust proxy', true);
server.use(helmet({ dnsPrefetchControl: false }));
server.use(compression());
server.use('/health', (req, res) => res.send({ 'nextjs-serverless': true }));
// add the middlewares

// figure out a way to move these paths to a new file
server.get('/posts/amp', (req, res) => nextApp.render(req, res, '/ampTest', { amp: false }));
server.get('*', (req, res) => requestHandler(req, res));

export const handler = (event, context, callback) => {
  if (event.source === 'serverless-plugin-warmup') {
    return callback(null, 'serverless-plugin-warmup');
  }
  return nextApp.prepare().then(() => awsServerlessExpress.proxy(
    awsServerlessExpress.createServer(server),
    event,
    context,
  ));
};
