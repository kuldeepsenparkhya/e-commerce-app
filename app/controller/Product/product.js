const { Products } = require("../../model");
const { handleError, handleResponse } = require("../../utils/helper");
const { productSchema } = require("../validator/productJoiSchema");

exports.create = async (req, res) => {
    try {
        const { sku, name, description, price, quantity, categoryID, brandID, } = req.body

        const { error } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return;
        };

        const data ={ sku, name, description, price, quantity, categoryID, brandID, }

        const newProduct = new Products(data);

        await newProduct.save();

        handleResponse(res, data, 'Your product has been successfully created.', 201);


    } catch (error) {
        
        handleError(error, 400, res);
    }
};