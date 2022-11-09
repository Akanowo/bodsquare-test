import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middlewares/async';
import ApiError from '../../middlewares/errorHandler/ApiError';
import Task from '../../models/task.model';
import { successResponse } from '../../utils/responses';

const updateTaskController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { ...update } = req.body;

		const taskUpdate = await Task.findByIdAndUpdate(id, update, {
			timestamps: true,
			new: true,
		});

		if (!taskUpdate) return next(new ApiError(404, 'Task not found'));

		return successResponse(res, 200, 'Task updated successfully', taskUpdate);
	}
);

export default updateTaskController;
