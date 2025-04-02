import express from "express";
import cors from "cors"; // pour autoriser les échanges avec le frontend
import { initDB } from "../database/configBDD";
import usersRouter from "../route/usersRouter"; // Importation du routeur des utilisateurs

const app = express(); // Crée une instance d'Express

app.use(express.json()); // Middleware pour analyser les données JSON
app.use(cors()); // Active CORS

// Initialisation de la base de données
initDB();

// Définition de la route pour /users
app.use('/api', usersRouter); // Cette ligne associe les routes définies dans usersRouter sous /api (donc /api/users)

// Route de base
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000; // Port sur lequel ton serveur écoute
app.listen(port, () => {
  console.log(`💜 Backend lancé http://localhost:${port}`);
});
