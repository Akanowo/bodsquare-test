import http from 'http';
import { Server } from 'socket.io';

const initializeSocket = (server: http.Server) => {
	const io = new Server(server);
	return io;
};

export default initializeSocket;
