import { Router } from 'express';
import test from './routes/test';
import users from './routes/users';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	test(app);
	users(app);
	return app;
};
