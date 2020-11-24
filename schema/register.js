const Joi = require ('@hapi/joi');

const registerSchema = {
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    confirmPassword:Joi.string().required()
};

module.exports = {
    registerSchema
};