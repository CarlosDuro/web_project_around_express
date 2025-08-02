require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3000, MONGODB_URL } = process.env;

// En Mongoose 8+ no es necesario usar las opciones deprecated
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "688c07d7a147f1c323b5ccaf",
  };
  next();
});

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.get("/", (req, res) => {
  res.redirect("/cards");
});

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
