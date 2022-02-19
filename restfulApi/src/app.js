const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routers/student.router");
const port = process.env.port || 3000;

app.use(express.json());
app.use(router);

// listen app
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
