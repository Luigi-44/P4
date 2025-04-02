import { Router } from 'express';
import { getUsers } from '../controller/usersController'; // Assure-toi que le chemin est correct

const router = Router();

// Route pour récupérer tous les utilisateurs
router.get('/users', getUsers); // Cette route sera accessible via /api/users

export default router;
