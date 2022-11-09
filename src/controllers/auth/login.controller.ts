import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middlewares/async';
import ApiError from '../../middlewares/errorHandler/ApiError';
import User from '../../models/user.model';
import { checkValidity, createAccessToken } from '../../utils/helpers/auth';
import logger from '../../utils/logger';
import formatLog from '../../utils/logger/fomatLog';
import { successResponse } from '../../utils/responses';

const loginController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		logger.info(formatLog(req, 'START: Login Service'));
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) return next(new ApiError(401, 'Invalid email or password'));

		if (!checkValidity(password, user.password))
			return next(new ApiError(401, 'Invalid email or password'));

		logger.info(formatLog(req, 'END: Login Service'));
		return successResponse(
			res,
			200,
			'Successfully logged in user',
			// @ts-ignore
			createAccessToken(user._id)
		);
	}
);

export default loginController;
