const express = require("express");
const router = express.Router();
const User = require("../models/users"); // Importa el modelo

// GET /users — obtener todos los usuarios desde MongoDB
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obteniendo usuarios", error: err.message });
  }
});

// GET /users/:id — obtener usuario por ID desde MongoDB
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "ID inválido", error: err.message });
  }
});

// POST /users — crear nuevo usuario en MongoDB
router.post("/", async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Datos inválidos", error: err.message });
    }
    res
      .status(500)
      .json({ message: "Error creando usuario", error: err.message });
  }
});

module.exports = router;
