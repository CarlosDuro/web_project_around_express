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

// GET /cards
router.get("/", (req, res) => {
  readJSON("cards.json", (err, cards) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error leyendo datos de tarjetas" });
    res.json(cards);
  });
});

module.exports = router;
