import { connect, connection, ConnectOptions } from 'mongoose';
import { mongoURI } from '../config';
import logger from '../utils/logger';
// import seedDB from "./seed";

const connectToDB = async (): Promise<any> => {
	try {
		await connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
			// useCreateIndex: true
		} as ConnectOptions);

		const db = connection;

		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', () => {
			logger.info('Database connected successfully!');
			// seedDB();
		});
	} catch (err) {
		console.error(err);
	}
};

export default connectToDB;
