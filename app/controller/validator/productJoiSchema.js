const Joi = require('joi');

// Joi schema for product
const productSchema = Joi.object({
    sku: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().default(0),
    categoryID: Joi.string().required(),
    brandID: Joi.string().required(),
});

module.exports = {
    productSchema
};
