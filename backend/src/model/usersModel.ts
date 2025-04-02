import { connectionBDD } from '../database/configBDD'; // Importez votre connexion à la base de données

// Fonction pour récupérer tous les utilisateurs
// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const getAllUsers = (callback: Function) => {
  connectionBDD.query('SELECT * FROM Users', (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

// Fonction pour ajouter un utilisateur
// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const addUser = (userData: any, callback: Function) => {
  connectionBDD.query('INSERT INTO Users SET ?', userData, (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const deleteUser = (userId: number, callback: Function) => {
  connectionBDD.query('DELETE FROM Users WHERE id = ?', [userId], (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const updateUser = (userId: number, userData: any, callback: Function) => {
  connectionBDD.query('UPDATE Users SET ? WHERE id = ?', [userData, userId], (err, results) => {
    if (err) return callback(err, null);
    return callback(null, results);
  });
};