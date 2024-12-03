const Joi = require('joi');

const registerValidator = Joi.object({
  fullName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  teamCode: Joi.string().required().length(6)
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  registerValidator,
  loginValidator
}; 