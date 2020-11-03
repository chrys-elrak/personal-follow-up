const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .min(6)
        .max(30)
        .required(),
    repeat_password: Joi.ref('password')
});