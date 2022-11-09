import { JwtPayload } from 'jsonwebtoken';

export interface JWTData extends JwtPayload {
	id: string;
}
