import express from "express"
import * as userController from "../controller/usersController" // Import du contrôleur pour la table users

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/users', userController.getUsers);
//Route Pour inserer un user
router.post('/users', userController.addUsers)

export default router;

