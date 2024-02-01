const Joi = require('joi');

// Joi schema for product category
const productCategorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    parentCategory: Joi.string(), // You might need to adjust this depending on your data structure
    subcategories: Joi.array().items(Joi.string()), // You might need to adjust this depending on your data structure
    products: Joi.array().items(Joi.string()), // You might need to adjust this depending on your data structure
});



module.exports = {
    productCategorySchema
};
