const http = require("http");
const fs = require("fs");
const PORT = process.env.port || 3000;

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  if (req.url === "/") {
    res.end("<h1>Hello World</h1>");
  } else if (req.url === "/about") {
    res.end("<h1>About Us Page</h1>");
  } else if (req.url === "/contact") {
    res.write("<h1>Contact Us Page</h1>");
    res.end();
  } else if (req.url === "/userapi") {
    fs.readFile(`${__dirname}/userapi.json`, "utf-8", (err, data) => {
      //   console.log(data);
      const objData = JSON.parse(data);
      console.log(objData[0].phone);
      res.end(objData[0].phone);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404, Error Page</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
