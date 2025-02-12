const express = require("express");
const moment = require("moment");
const users = require("./users");

const app = express();
const port = 3000;

// Middleware untuk parsing JSON (opsional)
app.use(express.json());

// Route untuk halaman home
app.get("/", (req, res) => {
  res.status(200).json({ message: "This is the home page" });
});

// Route untuk halaman about
app.get("/about", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "response success",
    description: "exercise #03",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
  });
});

// Route untuk halaman users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Route untuk menangani 404 (Not Found)
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
