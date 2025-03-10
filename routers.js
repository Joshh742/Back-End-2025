const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public" });
const users = require("./users");

routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.send("file berhasil diupload");
  } else {
    res.send("file gagal diupload");
  }
});

routers.get("/download", (req, res) => {
  const filename = "yes_king.png";
  res.download(path.join(__dirname, "/download/", filename), "yes_king.png");
});

routers.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
});

routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((u) => u.name.toLowerCase() === name);

  if (!user) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

routers.post("/users", (req, res) => {
  if (!Object.keys(req.body).length) {
    return res
      .status(400)
      .json({ message: "Masukkan data yang akan ditambahkan" });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };

  users.push(newUser);

  res.status(201).json({
    status: "success",
    message: "User berhasil ditambahkan",
    data: newUser,
  });
});

routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);
routers.put("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const updatedData = req.body;

  if (!Object.keys(updatedData).length) {
    return res
      .status(400)
      .json({ message: "Masukkan data yang akan diperbarui" });
  }

  const userIndex = users.findIndex((u) => u.name.toLowerCase() === name);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }

  users[userIndex] = { ...users[userIndex], ...updatedData };

  res.status(200).json({
    status: "success",
    message: "Data user berhasil diperbarui",
    data: users[userIndex],
  });
});

routers.delete("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const userIndex = users.findIndex((u) => u.name.toLowerCase() === name);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Data user tidak ditemukan" });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    status: "success",
    message: "Data user berhasil dihapus",
  });
});

routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);

routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query string= page :${page}, sort : ${sort}`);
});

module.exports = routers;
