import { StrictMode } from "react"; // Aide à détecter les erreurs et les mauvaises pratiques pendant le développement (en mode dev).
import { createRoot } from "react-dom/client"; // Crée la racine React dans le DOM pour initialiser le rendu de l'application React
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Crée un provider (RouterProvider) et un router (createBrowserRouter) pour gérer les routes de l'application React
import Accueil from "../pages/accueil/accueil.tsx";
import Client from "../pages/client/client.tsx";
import "./App.css";
import App from "./App.tsx";
import "./index.css";
const router = createBrowserRouter([
  // Déclare que dans router, je stock createBrowserRouter
  {
    element: <App />, // App est le parent de ce qu'il y a en dessous
    children: [
      {
        path: "/", // La page Acceuil est disponible dans l'URL http://localhost:XXXX/
        element: <Accueil />, // La Page Accueil est un enfant de App
      },
      {
        path: "/client",
        element: <Client />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root"); // La, on dit que a rootElement de trouver l'ID "root" dans l'HTML pour rendre l'affichage correct
if (rootElement == null) {
  //si il ne le trouve pas, il arrete de s'executer et rend un message d'erreur
  throw new Error(
    `"Your HTML Document should contain a <div id="root"></div>"`
  ); // root a besoin d'une <div> pour que React soit rendu :)
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
