const { ProductCategories } = require("../../model");
const { handleResponse, handleError } = require("../../utils/helper");

exports.create = async (req, res) => {
    try {
        const { name, description, parentCategoryID, subCategoriesID, productIDs } = req.body
        const { error } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return;
        };
        const data = { name, description, parentCategoryID, subCategoriesID, productIDs }

        const newProductCategory = new ProductCategories(data);

        await newProductCategory.save();

        handleResponse(res, data, 'Product category has been successfully created.', 201);

    } catch (error) {

        handleError(error, 400, res);
    }
};