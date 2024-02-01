const jwt = require('jsonwebtoken')

const { JWT_EXPIRESIN, JWT_SECREATE } = require("../config/config")
const { User } = require("../model");
const { handleError, handleResponse, getPagination } = require("../utils/helper");

const { registerUser, updateUser, updateUserProfile } = require('./validator/userJoiSchema');

// User can sign-up
exports.create = async (req, res) => {
    try {
        const { full_name, mobile, email, password, } = req.body;
        const { error } = registerUser.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res)
            return
        }

        const data = { full_name, mobile, email, password, };

        const token = jwt.sign({ data }, JWT_SECREATE, { expiresIn: JWT_EXPIRESIN });

        const newUser = new User(data);

        await newUser.save();

        const datad = { ...newUser._doc, token }

        handleResponse(res, datad, 201);

    } catch (error) {
        if (error.code === 11000) {
            handleError('This email is already exists.', 400, res)
            return
        }
        handleError(error.message, 400, res)
    };
};

// For admin only
exports.addUser = async (req, res) => {
    try {
        const { full_name, mobile, email, password, } = req.body;

        const { error } = registerUser.validate(req.body, { abortEarly: false });

        if (error) {
            handleError(error, 400, res)
            return
        }

        const data = { full_name, mobile, email, password, };

        const token = jwt.sign({ data }, JWT_SECREATE, { expiresIn: JWT_EXPIRESIN });

        const newUser = new User(data);

        await newUser.save();

        const datad = { ...newUser._doc, token }

        handleResponse(res, datad, 201);

    } catch (error) {
        if (error.code === 11000) {
            handleError('This email already exists.', 400, res)
            return
        }
        handleError(error.message, 400, res)
    };
};

// For admin only

exports.find = async (req, res) => {
    try {
        const { role, q } = req.query;
        const searchFilter = q ? {
            $or: [
                { full_name: { $regex: new RegExp(q, 'i') } },
                { email: { $regex: new RegExp(q, 'i') } }
            ]
        } : {};

        const users = await User.find({ ...searchFilter })

        const getUsers = users.filter((user) => user.role !== 'admin')

        const totalCount = await User.countDocuments()

        const getPaginationResult = await getPagination(req.query, getUsers, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error.message, 400, res)
    };
};

// For admin only

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id })
        handleResponse(res, user, 200)
    } catch (error) {
        handleError(error.message, 400, res)
    };
};

// For admin only
exports.update = async (req, res) => {
    try {
        const { full_name, email, mobile } = req.body
        const { id } = req.params;

        const { error } = updateUser.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, 400, res)
            return
        }

        const data = {
            full_name,
            email,
            mobile
        }
        await User.updateOne({ _id: id }, data, { new: true })
        handleResponse(res, [], 200, 'User has been updated.')
    } catch (error) {
        handleError(error, 400, res)
    };
};


// For admin only
exports.updateProfile = async (req, res) => {
    try {
        const { full_name, email, mobile } = req.body

        const { error } = updateUserProfile.validate(req.body, { abortEarly: false })

        if (error) {
            handleError(error, 400, res)
            return
        }

        const data = { full_name, email, mobile }

        await User.updateOne({ _id: req.user._id }, data, { new: true })

        handleResponse(res, [], 202, 'Profile updated here.')
    } catch (error) {
        handleError(error, 400, res)
    };
};



exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user._id === id || req.user.role === 'admin') {
            const user = await User.findOne({ _id: id })

            if (!user) {
                handleError('Invailid user.', 400, res)
                return
            }

            await User.deleteOne({ _id: user._id })

            handleResponse(res, 'User successfully removed.', 200)
        }
        else {
            handleError('User can delete self account or admin can delete user account.', 400, res)
            return
        }
    } catch (error) {
        handleError(error.message, 400, res)
    };
};
