const mongoose = require("mongoose");

// Regex para validar URLs (http, https, con o sin www, puertos opcionales, rutas y queries)
const urlRegex =
  /^(https?:\/\/)(www\.)?[a-zA-Z0-9\-\.~%]+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) =>
        `${props.value} no es un enlace válido para la imagen.`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Referencia al modelo User (con mayúscula)
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", cardSchema);
