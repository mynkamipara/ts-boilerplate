import { Router } from 'express';
import test from './routes/test';
import users from './routes/users';
import simple from './routes/simple';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	test(app);
	users(app);
	simple(app);
	return app;
};
