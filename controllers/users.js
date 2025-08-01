const User = require("../models/user");

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error al obtener usuarios", error: err.message })
    );
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: "ID de usuario no válido", error: err.message })
    );
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos", error: err.message });
      }
      res
        .status(500)
        .json({ message: "Error al crear usuario", error: err.message });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
