import { celebrate, Joi } from 'celebrate';

const USER_SCHEMA = {
	// Create poll validation schema
	SIGN_UP: celebrate({
		body: Joi.object({
			name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
		})
	}),
    LOG_IN: celebrate({
		body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
		})
	}),
};

export { USER_SCHEMA };
