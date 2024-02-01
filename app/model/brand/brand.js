const mongoose = require('mongoose');
const { Schema } = mongoose

const brandSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    originCountry: {
        type: String,
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Brand", brandSchema)