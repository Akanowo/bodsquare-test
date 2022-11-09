import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtConfig } from '../../config';

export interface IJWToken {
	token: string;
	expiresAt: number;
}

export const checkValidity = (value: string, compareValue: string): boolean => {
	return bcrypt.compareSync(value, compareValue);
};

export const createAccessToken = (id: string): IJWToken => {
	const { secret, expiresIn } = jwtConfig;
	const token: string = jwt.sign({ id }, secret, {
		expiresIn,
	});
	const expiresAt: number =
		(jwt.verify(token, secret) as JwtPayload).exp || Date.now();

	return { token, expiresAt };
};

export const generateHashedValue = (value: string): string => {
	return bcrypt.hashSync(value, 10);
};
