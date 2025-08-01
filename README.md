# Web Project Around Express - Sprint 15 y 16

Este proyecto es una API REST creada con **Node.js**, **Express** y **MongoDB** (usando **Mongoose**). Simula un backend para manejar **usuarios** y **tarjetas (cards)**, implementando validaciones, estructura modular, y rutas completas para operaciones básicas.

---

## 🚀 Cambios respecto al Sprint 15

- 🔄 Migración de datos desde archivos JSON a una base de datos MongoDB real.
- 🧱 Uso de **Mongoose** para definir esquemas de usuarios y tarjetas.
- ✅ Validaciones automáticas de campos (`name`, `about`, `avatar`).
- 🛠 Nuevas rutas `PATCH` para actualizar el perfil y el avatar del usuario.
- 🔧 Middleware para simular un usuario autenticado por defecto.

---

## 🗂 Estructura del proyecto

```bash
| .editorconfig
| .eslintrc
| .gitignore
| app.js
| package-lock.json
| package.json
| README.md
|
+---models
|   cards.js
|   users.js
|
+---routes
|   cards.js
|   users.js
```

## Rutas disponibles

- `GET /users`  
  Retorna la lista completa de usuarios en formato JSON.

- `GET /users/:id`  
  Retorna el usuario con el ID especificado.  
  Retorna un error 404 con mensaje si el usuario no existe.

- `GET /cards`  
  Retorna la lista completa de tarjetas en formato JSON.

- `PATCH /users/me`
  Actualiza el name y about del usuario actual.

  - `PATCH /users/me/avatar`
    Actualiza el avatar (avatar, formato URL) del usuario actual.

- Cualquier otra ruta devuelve un error 404 con mensaje JSON indicando que el recurso no fue encontrado.

---

## Cómo correr el proyecto

1. Clonar el repositorio y acceder a la carpeta raíz:

   ```bash
   git clone https://github.com/CarlosDuro/web_project_around_express.git
   cd web_project_around_express

   ```

2. Instalar las dependencias:

npm install

3. Iniciar el servidor:

- Modo producción:

npm run start

- Modo desarrollo (con hot reload usando nodemon):

npm run dev

4. Probar las rutas usando el navegador o herramientas como Postman en:

- http://localhost:3000/users
- http://localhost:3000/cards
- http://localhost:3000/users/:id
- http://localhost:3000/users/me
- http://localhost:3000/users/me/avatar
- http://localhost:3000/cards

Ejemplo de id http://localhost:3000/users/688c0b2f3c44171411df54b9

## Dependencias principales

Express — Framework para servidor HTTP.

Nodemon — Herramienta para desarrollo con hot reload (opcional).

ESLint con configuración Airbnb — Para mantener calidad y estilo en el código.

## Consideraciones

Los datos se leen desde archivos JSON usando el módulo fs y rutas con path.

El proyecto está pensado para ser una base simple antes de conectar con bases de datos reales.

El manejo de errores está implementado para rutas no encontradas y usuarios inexistentes.

## ⚙ Tecnologías usadas

- Node.js — Entorno de ejecución para JavaScript.
- Express — Framework para servidor HTTP.
- MongoDB — Base de datos NoSQL.
- Mongoose — ODM para MongoDB.
- Nodemon — Herramienta para desarrollo con recarga automática.
- ESLint (Airbnb config) — Estilo y calidad de código.

🌐 Ver el proyecto en línea: 👉 https://web-project-around-express.onrender.com

## Autor

Carlos Durán
