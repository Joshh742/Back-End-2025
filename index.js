const http = require("http");
const moment = require("moment");
const users = require("./users");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.write("This is the home page");
  } else if (url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.write(
      JSON.stringify({
        status: "success",
        message: "response success",
        description: "exercise #02",
        date: moment().format(" MMMM Do YYYY, h:mm:ss a"),
      })
    );
  } else if (url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.write(JSON.stringify(users));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/json");
    res.write("404 Users Not Found");
  }

  res.end();
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
