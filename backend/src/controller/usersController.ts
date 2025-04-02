import type { Request, Response } from 'express';
import { getAllUsers, addUser, deleteUser } from '../model/usersModel';

// Contrôleur pour récupérer tous les utilisateurs
export const getUsers = (req: Request, res: Response) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getAllUsers((err: any, users: any) => {
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

// Contrôleur pour ajouter un nouvel utilisateur
export const addUsers = (req: Request, res: Response): void => {
  const userData = req.body;
  
  // Validation des données
  if (!userData.username || !userData.email) { // Adaptez selon vos champs requis
    res.status(400).json({ message: 'Les champs nom et email sont obligatoires' });
    return;
  }
  
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addUser(userData, (err: any, result: any) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    
    // Retourner l'utilisateur créé avec son ID
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      userId: result.insertId,
      user: userData
    });
  });
};
// Contrôleur pour supprimer un utilisateur
export const deleteUsers = (req: Request, res: Response): void => {
  const userId = Number.parseInt(req.params.id);
  
  // Vérification que l'ID est un nombre valide
  if (Number.isNaN(userId)) {
    res.status(400).json({ message: 'ID utilisateur invalide' });
    return;
  }
  
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    deleteUser(userId, (err: any, result: any) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    
    // Vérifier si un utilisateur a été supprimé
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet ID' });
      return;
    }
    
    res.status(200).json({
      message: 'Utilisateur supprimé avec succès',
      userId: userId
    });
  });
};