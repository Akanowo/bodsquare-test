import connectToDB from './database/connect';
import * as dotenv from 'dotenv';
import User from './models/user.model';
import { generateHashedValue } from './utils/helpers/auth';

dotenv.config();

connectToDB();

const users = [
	{
		firstName: 'Akanowo',
		lastName: 'Uko',
		email: 'ukoakanowo98@gmail.com',
		password: generateHashedValue('password'),
	},
];

// Import into DB
const importData = async () => {
	try {
		await User.create(users);
		// await Course.create(courses);
		console.log('Data Imported...');
		process.exit();
	} catch (error) {
		console.error(error);
	}
};

// Delete data
const deleteData = async () => {
	try {
		await User.deleteMany();
		console.log('Data destroyed...');
		process.exit();
	} catch (error) {
		console.error(error);
	}
};

console.log(process.argv[2]);

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
