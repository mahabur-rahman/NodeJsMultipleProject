const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// middleware

// generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    // console.log(this._id);
    const token = jwt.sign(
      { _id: this._id.toString() },
      "mynameismahaburrahmanwebdeveloperuseingnodeexpressall"
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    // console.log(token);
    return token;
  } catch (err) {
    res.send(`Token error : ${err}`);
    console.log(`The error part : ${err}`);
  }
};
// convert password to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`the current password is : ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(`after hashing password : ${this.password}`);

    this.confirmpassword = undefined;
  }
  next();
});

// create a new collection
const Registration = new mongoose.model("Registration", userSchema);

// exports
module.exports = Registration;
