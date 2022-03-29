import expressLoader from './express';
import connectDB from './database';
import Logger from './logger';
import dependencyInjector from './dependencyInjector';

export default async ({ expressApp }) => {
	// Establish a database connection for node's process
	// await connectDB();

	// Load dependencies
	dependencyInjector();
	Logger.info('✌️ Dependency injector loaded');

	Logger.info('✌️ Express loaded');
	await expressLoader({ app: expressApp });
};
