const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { Schema } = mongoose

const userSchema = Schema({
  full_name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: [8, 'Must be at least 6 characters password'],
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin', 'vendor'],
    default: 'user',
    required: true,
  },

  token: {
    type: String,
  },
},
  {
    timestamps: true
  })

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema)