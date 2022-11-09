import express from 'express';
import cors from 'cors';
import http from 'http';
import logger from './utils/logger';
import connectToDB from './database/connect';
import apiRouter from './routes';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import { startTaskQueueListener } from './utils/helpers/rabbitmq/subscribe';
import initializeSocket from './utils/helpers/socket-io';

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const ioInstance = initializeSocket(server);

ioInstance.on('connection', (socket) => {
	console.log('New user connected to socket: ', socket.id);
});

// App config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//handle all routes
app.use('/api/v1', apiRouter);

//handle non-existent routes
app.use('*', notFound);

app.use(errorHandler);

server.listen(PORT, async () => {
	await connectToDB();
	startTaskQueueListener(ioInstance);
	logger.info(`
  #####################################
      #####################################
      Server listening on port: ${PORT}
      in ${app.settings.env} mode
      #####################################
  #####################################
  `);
});

export default server;
