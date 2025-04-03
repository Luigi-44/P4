import type { Request, Response } from "express";
import {
  getAllSites,
  getDivertissement,
  getFacturation,
} from "../model/sitesBycategoriesModel";

export const getDivertissementSites = (req: Request, res: Response) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getDivertissement((err: Error | null, results: any[] | null) => {
    if (err) {
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    if (!results || results.length === 0) {
      res.status(404).json({ message: "Aucun site de divertissement trouvé" });
      return;
    }
    res.status(200).json(results);
  });
};

export const getFacturationSites = (req: Request, res: Response) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getFacturation((err: Error | null, results: any[] | null) => {
    if (err) {
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    if (!results || results.length === 0) {
      res.status(404).json({ message: "Aucun site de facturation trouvé" });
      return;
    }
    res.status(200).json(results);
  });
};

export const getAllSitesByCategories = (req: Request, res: Response) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getAllSites((err: Error | null, results: any[] | null) => {
    if (err) {
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    if (!results || results.length === 0) {
      res.status(404).json({ message: "Aucun site de facturation trouvé" });
      return;
    }
    res.status(200).json(results);
  });
};
