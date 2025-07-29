const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

function readJSON(filename, callback) {
  const filepath = path.join(__dirname, "..", "data", filename);
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) return callback(err);
    try {
      const json = JSON.parse(data);
      callback(null, json);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}

// GET /users
router.get("/", (req, res) => {
  readJSON("users.json", (err, users) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error leyendo datos de usuarios" });
    res.json(users);
  });
});

// GET /users/:id
router.get("/:id", (req, res) => {
  readJSON("users.json", (err, users) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error leyendo datos de usuarios" });
    const user = users.find((u) => u._id === req.params.id);
    if (!user)
      return res.status(404).json({ message: "ID de usuario no encontrado" });
    res.json(user);
  });
});

module.exports = router;
