const express = require("express");
const router = express.Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// GET /cards — obtener todas las tarjetas
router.get("/", getAllCards);

// POST /cards — crear nueva tarjeta
router.post("/", createCard);

// DELETE /cards/:cardId — eliminar tarjeta por ID
router.delete("/:cardId", deleteCardById);

// PUT /cards/:cardId/likes — dar like
router.put("/:cardId/likes", likeCard);

// DELETE /cards/:cardId/likes — quitar like
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
