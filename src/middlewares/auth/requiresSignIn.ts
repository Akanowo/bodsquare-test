import { ObjectId } from 'mongodb';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtConfig } from '../../config';
import User from '../../models/user.model';
import { JWTData } from '../../types/global';
import ApiError from '../errorHandler/ApiError';

const requiresSignIn = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { secret } = jwtConfig;
		const authHeader: string = req.headers['authorization'] || '';
		if (!authHeader) {
			return next(new ApiError(401, 'No token provided'));
		}

		const token: string = authHeader.replace('Bearer ', '');

		//verify JWT
		const decoded: string | JwtPayload = jwt.verify(token, secret);
		const id = (decoded as JWTData).id;

		if (!id) return next(new ApiError(403, 'Invalid token provided'));

		const user = await User.findById(id);

		if (!user) return next(new ApiError(403, 'Invalid token provided'));
		//save user in request for use in routes
		// @ts-ignore
		req.user = user;

		next();
	} catch (err) {
		next(err);
	}
};

export default requiresSignIn;
