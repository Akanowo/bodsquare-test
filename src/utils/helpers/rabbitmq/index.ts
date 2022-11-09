import amqplib from 'amqplib';
import { AMQP_URI, TASK_QUEUE } from '../../../config';

const connectAmqplib = async () => {
	const conn = await amqplib.connect(AMQP_URI);

	const channel = await conn.createChannel();

	await channel.assertQueue(TASK_QUEUE, {
		durable: false,
	});

	return channel;
};

export default connectAmqplib;
