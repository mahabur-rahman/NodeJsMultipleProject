const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// create a new schema
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

// middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current password is : ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`after hashing password : ${this.password}`);

    this.confirmpassword = undefined;
  }
  next();
});

// create a new collection
const Registration = new mongoose.model("Registration", userSchema);

// exports
module.exports = Registration;
