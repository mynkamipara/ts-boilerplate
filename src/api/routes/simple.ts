import { Router, Request, Response } from 'express';

import { ISimple } from '../../interfaces/ISimple';
import Logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
	app.use('/simple', route);
	route.get('/', simpleTestAPI);
    route.post('/', simpleTestAPIwithInput);
};

async function simpleTestAPI(req: Request, res: Response) {
	ISimple.onlyStatisResponse()
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
            console.log(e)
			Logger.errorAndMail(e);
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}

async function simpleTestAPIwithInput(req: Request, res: Response) {
    const params = req.body;
	ISimple.onlyStatisResponsewithParams(params)
		.then(response => {
			res.status(response.status).json(response);
		})
		.catch(e => {
            console.log(e)
			Logger.errorAndMail(e);
			res.status(500).json({ status: 500, message: 'Something went wrong' });
		});
}

