const mongoose = require("mongoose")
const { Schema } = mongoose

const productsategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    parentCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    },
    subCategoriesID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    }],
    productIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
},
  {
    timestamps: true
  })



module.exports = mongoose.model("ProductCategory", productsategorySchema)