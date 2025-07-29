# Web Project Around Express - Sprint 15

Este proyecto es una API REST básica creada con **Node.js** y **Express**, que simula un backend para manejar usuarios y tarjetas (cards) usando archivos JSON como fuente de datos. Está diseñada para practicar la creación de rutas, manejo de archivos, y estructuración modular.

---

## Estructura del proyecto

- `/app.js` — Archivo principal que configura el servidor Express y las rutas.
- `/routes/` — Carpeta que contiene los archivos de rutas modulares (`users.js` y `cards.js`).
- `/data/` — Carpeta que contiene los archivos JSON con datos estáticos (`users.json` y `cards.json`).

---

## Rutas disponibles

- `GET /users`  
  Retorna la lista completa de usuarios en formato JSON.

- `GET /users/:id`  
  Retorna el usuario con el ID especificado.  
  Retorna un error 404 con mensaje si el usuario no existe.

- `GET /cards`  
  Retorna la lista completa de tarjetas en formato JSON.

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

Ejemplo de id http://localhost:3000/users/8340d0ec33270a25f2413b69

```

## Dependencias principales

Express — Framework para servidor HTTP.

Nodemon — Herramienta para desarrollo con hot reload (opcional).

ESLint con configuración Airbnb — Para mantener calidad y estilo en el código.

## Consideraciones

Los datos se leen desde archivos JSON usando el módulo fs y rutas con path.

El proyecto está pensado para ser una base simple antes de conectar con bases de datos reales.

El manejo de errores está implementado para rutas no encontradas y usuarios inexistentes.

## Autor
Carlos Durán
```
