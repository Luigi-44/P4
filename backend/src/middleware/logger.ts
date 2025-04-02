import type { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => { 
  console.info(`                           
    ${new Date().toLocaleString()} - Method: "${req.method}" on Path: "${req.path}"
  `); // new Date = la date du jour, req.method = CRUD, req.path = l'url utilisée

  next(); // Permet à la requête de passer au middleware suivant ou à la route
}
