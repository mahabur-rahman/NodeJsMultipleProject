const express = require("express");
const path = require("path");
const morgan = require("morgan");
// const ejs = require("ejs");
const app = express();

const PORT = process.env.PORT || 3000;

// const staticPath = path.join(__dirname, "/public/src");
const templatePath = path.join(__dirname, "./templates/views");

// ejs
app.set("view engine", "ejs");
app.set("views", templatePath);

// middleware
// app.use(express.static(staticPath));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index", {
    label: "ejs",
    text: "This is demo text here",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// app.get("/", (req, res) => {
//   res.send("home page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

app.get("/contact", (req, res) => {
  //   res.status(200).send("<h1>Contact Page</h1>");
  res.send([
    {
      Id: 1,
      name: "mahabur",
      type: null,
    },
    {
      Id: 2,
      name: "mahabur",
    },
  ]);
});


// error page 
app.get("*", (req, res) => {
  res.status(404).send("<h1>404, Not Found Page</h1>");
});

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
