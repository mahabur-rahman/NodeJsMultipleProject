const mongoose = require("mongoose");
const validator = require("validator");

// schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },

  phone: {
    type: Number,
    required: true,
    // min: 11,
    // max : 11,
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },
});

// model or create a new collection
const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
