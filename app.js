const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Importar routers
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

// Middleware para parsear JSON
app.use(express.json());

// Usar routers en rutas específicas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Ruta raíz con mensaje de bienvenida y lista de endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de Carlos Durán funcionando correctamente 🚀",
    endpoints: ["/users", "/users/:id", "/cards"],
  });
});

// Manejar rutas no definidas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
