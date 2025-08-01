const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

// Importar routers
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

// Middleware para parsear JSON
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "688c07d7a147f1c323b5ccaf", // Usa el _id real del usuario de prueba que creaste
  };
  next();
});

// Usar routers en rutas específicas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta raíz que redirige a /cards
app.get("/", (req, res) => {
  res.redirect("/cards");
});

// Manejar rutas no definidas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
