import { Container } from 'typedi';
import Logger from '../loaders/logger';
import Users from '../models/User';
export class IUsers {
	static async signUp(data: object) {
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
            userData.password = data['password'];
			await userData.save();
			return {
				status: 200,
				data: 'Added',
			};
		} catch (error) {
            console.log(error)
			Logger.errorAndMail(error);
			return { status: 500, message: 'Something went wrong' };
		}
	}

    static async logIn(data: object) {
		try {
			let users = await Users.findOne({ email: data['email'] });
			if (!users)
				return {
					status: 400,
					message: 'Email not Exists',
				};
            let checkPassword = await users.comparePassword(data['password']);
            console.log(checkPassword,'-checkPassword')
			if(!checkPassword)
                return {
                    status: 400,
                    message: 'Password mismatch.',
                };
			return {
				status: 200,
                data:users,
				message: 'LoggedIn',
			};
		} catch (error) {
            console.log(error)
			Logger.errorAndMail(error);
			return { status: 500, message: 'Something went wrong' };
		}
	}
}
