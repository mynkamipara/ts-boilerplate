import { Container } from 'typedi';
import Logger from '../loaders/logger';
export class ISimple {
	static async onlyStatisResponse() {
		try {
			let staticRes = {
                fullName:'FirstName LastName'
            }
			return {
				status: 200,
				data: staticRes,
			};
		} catch (error) {
            console.log(error)
			Logger.errorAndMail(error);
			return { status: 500, message: 'Something went wrong' };
		}
	}

    static async onlyStatisResponsewithParams(params) {
		try {
			let staticRes = {
                params:params
            }
			return {
				status: 200,
				data: staticRes,
			};
		} catch (error) {
            console.log(error)
			Logger.errorAndMail(error);
			return { status: 500, message: 'Something went wrong' };
		}
	}
}
