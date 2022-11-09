import { TASK_QUEUE } from '../../../config';
import connectAmqp from './index';
import { Server } from 'socket.io';
import Task from '../../../models/task.model';

export const startTaskQueueListener = async (io: Server) => {
	const channel = await connectAmqp();

	channel.consume(
		TASK_QUEUE,
		async (msg) => {
			if (msg?.content) {
				console.log('New message in task queue');
				const json_data = msg.content.toString();
				const data = JSON.parse(json_data);
				const { title, description, userId } = data;

				// save task to db
				const task = await Task.create({
					title,
					description,
					createdBy: userId,
				});

				// send socket event
				io.emit('new-task', { message: 'A new task has been created', task });
			}
		},
		{ noAck: true }
	);
};
