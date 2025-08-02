require("dotenv").config(); // Carga variables de entorno desde .env

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3000, MONGODB_URL } = process.env;

// Conectar a MongoDB Atlas usando variable de entorno
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
  });

// Middleware para parsear JSON
app.use(express.json());

// Middleware temporal para simular usuario autenticado
app.use((req, res, next) => {
  req.user = {
    _id: "688c07d7a147f1c323b5ccaf", // Asegúrate de que este ID exista en tu base de datos Atlas
  };
  next();
});

// Rutas
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.redirect("/cards");
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
