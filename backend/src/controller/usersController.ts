import type { Request, Response } from 'express';
import { getAllUsers } from '../model/usersModel'; // Import du modèle

// Contrôleur pour récupérer tous les utilisateurs
export const getUsers = (req: Request, res: Response) => {
  getAllUsers((err, users) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (!users) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
    }

    // Retourner la liste des utilisateurs
    return res.status(200).json(users);
  });
};
