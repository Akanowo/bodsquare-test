import { Router } from 'express';
import createTaskController from '../controllers/task/createTask.controller';
import deleteTaskController from '../controllers/task/deleteTask.controller';
import updateTaskController from '../controllers/task/updateTask.controller';
import requiresSignIn from '../middlewares/auth/requiresSignIn';

const taskRouter = Router();

taskRouter
	.route('/:id')
	.patch(requiresSignIn, updateTaskController)
	.delete(requiresSignIn, deleteTaskController);

taskRouter.route('/').post(requiresSignIn, createTaskController);

export default taskRouter;
