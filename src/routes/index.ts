import { Router } from 'express';
import authRouter from './auth.route';
import taskRouter from './task.route';

const router = Router();

// API routes
router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

export default router;
