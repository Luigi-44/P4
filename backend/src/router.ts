import { Router } from 'express';
import { getUsers } from './controller/usersController'; // Import du contrôleur

const router = Router();

// Route pour récupérer tous les utilisateurs
router.get('/users', getUsers); // Lors de la requête GET sur /users, appeler la fonction getUsers du contrôleur

export default router;
