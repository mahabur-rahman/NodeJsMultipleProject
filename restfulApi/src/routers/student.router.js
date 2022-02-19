const express = require("express");
const router = express.Router();
const Student = require("../models/student_schema");

router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);

    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(`user not saved : ${e}`);
  }
});

// read data
router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.status(400).send(`Read data error : ${e}`);
  }
});

// read individual data
router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const studentData = await Student.findById({ _id });
    res.status(200).send(studentData);
  } catch (e) {
    res.status(500).send(`Read data error : ${e}`);
  }
});

// update data
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const updateData = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateData);
  } catch (e) {
    res.status(404).send(`Update Problem : ${e}`);
  }
});

// delete data
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findByIdAndDelete(_id);
    if (!studentData) {
      return res.status(400).send();
    }
    res.send(studentData);
  } catch (e) {
    res.status(500).send(`Delete data error : ${e}`);
  }
});

// root path
router.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// 404 error
router.get("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

module.exports = router;
