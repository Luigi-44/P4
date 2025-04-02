import { connectionBDD } from '../database/configBDD'; // Assure-toi que la connexion MySQL est correctement configurée
import type { RowDataPacket } from 'mysql2'; // Type pour définir les résultats des requêtes

// Définir l'interface pour un utilisateur
export interface User {
  id: number;
  username: string;
  email: string;
}

// Récupérer tous les utilisateurs
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getAllUsers = (callback: (err: any, users: User[] | null) => void) => {
  const query = 'SELECT * FROM Users'; // La requête SQL pour récupérer tous les utilisateurs
  
  connectionBDD.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }

    // Casting des résultats en tableau d'objets de type User
    const users = (results as RowDataPacket[]).map((row) => ({
      id: row.id,
      username: row.username,
      email: row.email,
    }));

    callback(null, users);
  });
};

