const mongoose = require("mongoose");

// Regex para validar URLs (http, https, con o sin www, puertos opcionales, rutas y queries)
const urlRegex = /^(https?:\/\/)(www\.)?[\w\-\.~%]+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} no es una URL válida`,
    },
  },
});

module.exports = mongoose.model("User", userSchema, "users");
