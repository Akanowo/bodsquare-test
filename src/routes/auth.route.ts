import { Router } from 'express';
import loginController from '../controllers/auth/login.controller';
import joiMiddleware from '../middlewares/joiMiddleware';
import { loginValidator } from '../validators/auth.validator';

const authRouter = Router();

authRouter.route('/login').post(joiMiddleware(loginValidator), loginController);

export default authRouter;
