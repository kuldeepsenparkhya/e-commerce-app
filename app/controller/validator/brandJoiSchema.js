const Joi = require('joi');

const brandSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    originCountry: Joi.string().required(),
});

module.exports = { brandSchema }
