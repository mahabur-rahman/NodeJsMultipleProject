const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const hbs = require("hbs");
const app = express();
require("./db/conn");
const Register = require("./models/register");
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// home page or static
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));

// hbs
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

// home page
app.get("/", (req, res) => {
  res.render("index");
});

// register page
app.get("/register", (req, res) => {
  res.render("register");
});

// create a new user
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const userData = new Register({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: password,
        confirmpassword: cpassword,
      });

      // password hash

      const result = await userData.save();
      res.status(201).render("index");
    } else {
      res.send(`Password are not matching`);
    }
  } catch (err) {
    res.status(400).send(`User registration post prolem : ${err}`);
  }
});

// login page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email });

    const isMatch = await bcrypt.compare(password, userEmail.password);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("Password are not matching");
    }

    // res.send(userEmail);
  } catch (err) {
    res.status(400).send("Invalid User");
  }
});

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
