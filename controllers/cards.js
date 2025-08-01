const Card = require("../models/cards");
const mongoose = require("mongoose");

// Obtener todas las tarjetas
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).json(cards))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error al obtener tarjetas", error: err.message })
    );
};

// Crear una nueva tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // ID del usuario del middleware temporal

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos", error: err.message });
      }
      res
        .status(500)
        .json({ message: "Error al crear tarjeta", error: err.message });
    });
};

// Eliminar una tarjeta por ID
const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  Card.findById(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      // Aquí puedes validar que solo el owner pueda borrar, si quieres
      return card
        .deleteOne()
        .then(() => res.status(200).json({ message: "Tarjeta eliminada" }));
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      res
        .status(500)
        .json({ message: "Error al eliminar tarjeta", error: err.message });
    });
};

// Dar like a una tarjeta
const likeCard = (req, res) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // agrega solo si no existe
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(400)
          .json({ message: "ID inválido", error: err.message });
      }
      res
        .status(500)
        .json({ message: "Error al dar like", error: err.message });
    });
};

// Quitar like a una tarjeta
const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // elimina _id
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(400)
          .json({ message: "ID inválido", error: err.message });
      }
      res
        .status(500)
        .json({ message: "Error al quitar like", error: err.message });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
