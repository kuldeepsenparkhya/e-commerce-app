const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = Schema({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    },
    brandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },

}, {
    timestamps: true
})


// Create model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
