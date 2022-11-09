import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Task = model('Task', taskSchema);

export default Task;
