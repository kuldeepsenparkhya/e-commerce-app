const Joi = require("joi")

const addressSchema = Joi.object().keys({
    address1: Joi.string().required(),
    address2: Joi.string().allow(null).allow(''),
    landmark: Joi.string().required().allow(null).allow(''),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pin_code: Joi.string().required(),

});



const updateAddressSchema = Joi.object().keys({
    address1: Joi.string().required(),
    address2: Joi.string().allow(null).allow(''),
    landmark: Joi.string().required().allow(null).allow(''),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pin_code: Joi.string().required(),

});




module.exports = {
    addressSchema,
    updateAddressSchema
}