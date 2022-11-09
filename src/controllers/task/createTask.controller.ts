import { Request, Response, NextFunction } from 'express';
import { TASK_QUEUE } from '../../config';
import asyncHandler from '../../middlewares/async';
import connectAmqplib from '../../utils/helpers/rabbitmq';
import { successResponse } from '../../utils/responses';

const createTaskController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { title, description } = req.body;

		// @ts-ignore
		const { _id } = req.user;

		// send task to queue
		const channel = await connectAmqplib();

		channel.sendToQueue(
			TASK_QUEUE,
			Buffer.from(JSON.stringify({ title, description, userId: _id }))
		);

		return successResponse(res, 201, 'Task received successfully');
	}
);

export default createTaskController;
