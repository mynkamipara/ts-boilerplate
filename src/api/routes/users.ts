import { Router, Request, Response } from 'express';

import { IUsers } from '../../interfaces/IUsers';
import Logger from '../../loaders/logger';
import {USER_SCHEMA} from '../../schema/users'

const route = Router();

export default (app: Router) => {
	app.use('/user', route);
	route.post('/signup', USER_SCHEMA.SIGN_UP,signUp);
    route.post('/login', USER_SCHEMA.LOG_IN,logIn);
};

async function signUp(req: Request, res: Response) {
	const data = req.body;
	IUsers.signUp(data)
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
            console.log(e)
			Logger.errorAndMail(e);
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}

async function logIn(req: Request, res: Response) {
	const data = req.body;
	IUsers.logIn(data)
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
            console.log(e)
			Logger.errorAndMail(e);
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}