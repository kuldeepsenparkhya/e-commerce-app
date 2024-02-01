const { Brands } = require("../../model");
const { handleResponse, handleError } = require("../../utils/helper");
const { brandSchema } = require("../validator/brandJoiSchema");

exports.create = async (req, res) => {
    try {
        const { name, description, originCountry, } = req.body;

        const { error } = brandSchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return;
        };

        const data = { name, description, originCountry }

        const newBrand = new Brands(data);

        const savedBrand = await newBrand.save();
        
        handleResponse(res, savedBrand, 'Your Brand has been successfully created.', 201)

    } catch (error) {
        handleError(error, 400, res);
    }
};