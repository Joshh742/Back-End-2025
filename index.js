// const http = require("http");
// const { hello, greetings } = require("./helloWorld");
// const moment = require("moment");
// const express = require("express");
// const app = express();
// const morgan = require("morgan");

// //Middleware;
// const log = (req, res, next) => {
//   console.log(
//     moment().format("MMMM Do YYYY, h:mm:ss a") +
//       " " +
//       req.ip +
//       " " +
//       req.originalUrl
//   );
//   next();
// };

// app.use(morgan("tiny"));

// app.get("/", (req, res) => res.send("Hello World"));
// app.get("/about", (req, res) =>
//   res.status(200).json({
//     status: "success",
//     message: "About page",
//     data: [],
//   })
// );
// app.post("/contoh", (req, res) => res.send("request method POST"));
// app.put("/contoh", (req, res) => res.send("Request method PUT"));
// app.delete("/contoh", (req, res) => res.send("Request method DELETE"));
// app.patch("/contoh", (req, res) => res.send("Request method PATCH"));

// app.all("/universal", (req, res) => res.send(`Request method ${req.method}`));
// // Routing dinamis
// // 1. Menggunakan params
// app.get("/post/:id", (req, res) => res.send(`Artikel ke - ${req.params.id}`));
// // 2. Menggunakan Query String
// app.get("/post", (req, res) => {
//   const { page, sort } = req.query;
//   res.send(`Query string= page :${page}, sort : ${sort}`);
// });

// //Middleware
// app.use((req, res, next) => {
//   res.status(404).json({
//     status: "error",
//     message: "Resource not found",
//   });
// });

// const hostname = "127.0.0.1";
// const port = 3000;
// app.listen(port, hostname, () =>
//   console.log(`Server running at http://${hostname}:$c{port}`)
// );
// const express = require("express");
// const morgan = require("morgan");
// const moment = require("moment"); // Tambahkan ini
// const users = require("./users");

// const app = express();

// // Middleware untuk logging dengan timestamp
// const log = (req, res, next) => {
//   console.log(
//     moment().format("YYYY-MM-DD HH:mm:ss") +
//       " " +
//       req.ip +
//       " " +
//       req.originalUrl
//   );
//   next();
// };

// // Middleware logging dengan Morgan dan log custom
// app.use(morgan("tiny"));
// app.use(log); // Pastikan middleware log digunakan

// // Endpoint untuk mendapatkan semua users
// app.get("/users", (req, res) => {
//   res.json(users);
// });

// // Endpoint untuk mendapatkan user berdasarkan nama (case insensitive)
// app.get("/users/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();
//   const user = users.find((u) => u.name.toLowerCase() === name);

//   if (!user) {
//     return res.status(404).json({ message: "Data user tidak ditemukan" });
//   }

//   res.json(user);
// });

// // Middleware untuk menangani rute yang tidak ditemukan (404)
// app.use((req, res) => {
//   res.status(404).json({
//     status: "error",
//     message: "resource tidak ditemukan",
//   });
// });

// // Middleware untuk menangani error server
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: "error",
//     message: "terjadi kesalahan pada server",
//   });
// });

// const hostname = "127.0.0.1";
// const port = 3000;
// app.listen(port, hostname, () =>
//   console.log(`Server running at http://${hostname}:$c{port}`)
// );
const http = require("http");
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");
const express = require("express");
const morgan = require("morgan");
// const errorhandler = require("errorhandler");
const app = express();
const routers = require("./routers");
const path = require("path");
const cors = require("cors");

//Middleware
const log = (req, res, next) => {
  console.log(
    moment().format("h:mm:ss a") + " " + req.originalUrl + " " + req.ip
  );
  next();
};

app.use(morgan("tiny"));
// app.use(errorhandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  })
);
//Routing
app.use(routers);

//Middleware untuk 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "resource tidak ditemukan",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
