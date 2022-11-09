import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middlewares/async';
import ApiError from '../../middlewares/errorHandler/ApiError';
import Task from '../../models/task.model';
import { successResponse } from '../../utils/responses';

const deleteTaskController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		const task = await Task.findByIdAndDelete(id);

		if (!task) return next(new ApiError(404, 'Task not found'));

		return successResponse(res, 200, 'Task deleted successfully');
	}
);

export default deleteTaskController;
