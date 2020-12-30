import { Router, Request, Response } from 'express';

import { ITestApi } from '../../interfaces/ITestApi';
import Logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
	app.use('/user', route);

	//all Routes of '/countries'
	route.get('/', getUserList);
	route.post('/', SetUser);
};

async function getUserList(req: Request, res: Response) {
	ITestApi.getUserList()
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
			Logger.errorAndMail(e);
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}

async function SetUser(req: Request, res: Response) {
	const data = req.body;
	ITestApi.SetUser(data)
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
			Logger.errorAndMail(e);
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}