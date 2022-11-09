import Joi from 'joi';

export const loginValidator = Joi.object({
	email: Joi.string().email().required().messages({
		'any.invalid': 'Please enter a valid email address',
	}),
	password: Joi.string().required(),
});
