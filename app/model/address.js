const mongoose = require("mongoose")
const { Schema } = mongoose

const addressSchema = Schema({
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
  },
  landmark: {
    type: String,
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pin_code: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['default', 'active', 'inactive', 'deleted'],
    default: 'default',
    required: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },

  user_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
  {
    timestamps: true
  })


module.exports = mongoose.model("Address", addressSchema)