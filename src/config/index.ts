import * as dotenv from 'dotenv';

dotenv.config();

export const nodeEnv = process.env.NODE_ENV || 'development';
export const AMQP_URI = process.env.AMQP_URI || 'amqp://localhost';
export const TASK_QUEUE = 'TASK_QUEUE';
export const jwtConfig = {
	secret: process.env.JWT_SECRET || '',
	expiresIn: Number(process.env.JWT_EXPIRES_IN) || '',
};
export const mongoURI =
	process.env.MONGO_URI || 'mongodb://localhost:27017/bodsquare-test-db';
