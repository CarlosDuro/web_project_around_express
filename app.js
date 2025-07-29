const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Importar routers
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(express.json());

// Usar routers en rutas específicas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta raíz con mensaje de bienvenida
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "API de Carlos Durán funcionando correctamente 🚀" });
});

// Manejar rutas no definidas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
