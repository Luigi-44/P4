import cors from "cors"; // pour autoriser les échanges avec le frontend
import express from "express";
import path from "node:path";
import { initDB } from "../database/configBDD";
import categoriesRouter from "../route/categoriesRouter";
import sitesBycategoriesRouter from "../route/sitesBycategoriesRouter";
import usersRouter from "../route/usersRouter"; // Importation du routeur des utilisateurs

const app = express(); // Crée une instance d'Express

// Configuration CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL de votre frontend Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // Middleware pour analyser les données JSON

// Initialisation de la base de données
initDB();

// Routes
app.use("/api", usersRouter); // Cette ligne associe les routes définies dans usersRouter sous /api (donc /api/users)
app.use("/api", categoriesRouter);
app.use("/api", sitesBycategoriesRouter);

// Middleware pour les fichiers statiques
app.use(
  "/assets",
  express.static(path.join(__dirname, "../assetsback/"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Content-Type", "image/png"); // Ajustez selon le type d'image
    },
  })
);

// Route de base
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000; // Port sur lequel ton serveur écoute
app.listen(port, () => {
  console.log(`💜 Backend lancé http://localhost:${port}`);
});

export default app;
