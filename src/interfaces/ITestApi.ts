import { Container } from 'typedi';
import Logger from '../loaders/logger';
import Users from '../models/User';
export class ITestApi {
	static async getUserList() {
		try {
			let users = await Users.find({});
			if (users.length == 0) return {
				status: 404, message: 'User Not Found.'
			}
			return { status: 200, data:users }
		} catch (error) {
			Logger.errorAndMail(error);
			return { status: 500, message: 'Something went wrong' };
		}
	}

	static async SetUser(data: object) {
		try {
			let users = await Users.findOne({ email: data['email'] });
			if (users)
				return {
					status: 400,
					data: 'Already Exist User',
				};
			let userData = new Users();
			userData.name = data['name'];
			userData.email = data['email'];
			await userData.save();
			return {
				status: 200,
				data: 'Added',
			};
		} catch (error) {
			Logger.errorAndMail(error);
			return { status: 500, message: 'Something went wrong' };
		}
	}
}
