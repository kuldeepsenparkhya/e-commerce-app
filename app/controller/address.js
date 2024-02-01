const { Address } = require("../model");
const { handleError, handleResponse } = require("../utils/helper");
const { addressSchema, updateAddressSchema } = require("./validator/addressJoiSchema");

exports.create = async (req, res) => {
    try {
        const { address1, address2, landmark, city, state, pin_code } = req.body;

        const { error } = addressSchema.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res);
            return
        };

        const data = { address1, address2, landmark, city, state, pin_code, user_ID: req.user._id }

        const newAddress = new Address(data);

        await newAddress.save();

        handleResponse(res, data, 'Your address has been successfully submitted.', 201);

    } catch (error) {
        handleError(error, 400, res);
    }
};

exports.findAll = async (req, res) => {
    try {
        const { userID } = req.params

        const address = await Address.find({ user_ID: userID })

        handleResponse(res, address, 'Address has been retrieved successfully.', 200,)

    } catch (error) {
        handleError(error, 400, res);
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params

        const address = await Address.findOne({ _id: id })

        handleResponse(res, address, 'Address has been fetched.', 200,)

    } catch (error) {
        handleError(error, 400, res);
    }
};


exports.updateAddress = async (req, res) => {
    try {

        const { id } = req.params;

        const adddress = await Address.findOne({ _id: id, user_ID: req.user._id })

        if (!adddress) {
            handleError('Invalid address ID provided.', 400, res);
            return;
        };

        const { address1, address2, landmark, city, state, pin_code } = req.body;

        const { error } = updateAddressSchema.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, 400, res)
            return
        }

        const data = { address1, address2, landmark, city, state, pin_code }

        await User.updateOne({ _id: id, user_ID: req.user._id, }, data, { new: true })

        handleResponse(res, [], 202, 'Your address has been successfully updated.')

    } catch (error) {
        handleError(error, 400, res)
    };
};


exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({ _id: id })

        if (!address) {
            handleError('Invalid address ID provided.', 400, res)
            return;
        }

        await Address.updateOne({ _id: id }, { status: 'inactive', isDeleted: true }, { new: true })

        handleResponse(res, [], 'Address successfully removed.', 200)
    }

    catch (error) {

        handleError(error, 400, res);
    };
}


exports.parmanentDeleted = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.findOne({ _id: id })

        if (!address) {
            handleError('Invalid address ID provided.', 400, res)
            return;
        }

        await Address.deleteOne({ _id: id }, { status: 'deleted', isDeleted: true }, { new: true })

        handleResponse(res, [], 'The address has been permanently removed successfully.', 200)
    }

    catch (error) {

        handleError(error, 400, res);
    };
}