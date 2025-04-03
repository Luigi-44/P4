import type { Request, Response } from "express";
import * as categoryModel from "../model/categoriesModel";

export const getCategories = (req: Request, res: Response) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  categoryModel.getCategories((err: any, results: any) => {
    if (err) {
      console.error("Erreur lors de la récupération des catégories:", err);
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    if (!results) {
      res.status(404).json({ message: "Aucune catégorie trouvée" });
      return;
    }
    res.status(200).json(results);
  });
};

export const addCategory = (req: Request, res: Response) => {
  const category = req.body;

  if (!category.name) {
    res.status(400).json({ message: "Le nom de la catégorie est obligatoire" });
    return;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  categoryModel.addCategory(category, (err: any, results: any) => {
    if (err) {
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    res.status(200).json(results);
  });
};

export const deleteCategory = (req: Request, res: Response) => {
  const categoryId = req.params.id;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  categoryModel.deleteCategory(Number(categoryId), (err: any, results: any) => {
    if (err) {
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    res.status(200).json(results);
  });
};

export const updateCategory = (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const category = req.body;
  categoryModel.updateCategory(
    Number(categoryId),
    category,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (err: any, results: any) => {
      if (err) {
        res.status(500).json({ message: "Erreur serveur" });
        return;
      }
      res.status(200).json(results);
    }
  );
};

export const createCategoryWithSite = (req: Request, res: Response) => {
  const { categoryName, siteUrl, siteImage } = req.body;

  // Validation des données
  if (!categoryName || !siteUrl) {
    res
      .status(400)
      .json({ message: "Le nom de la catégorie et l'URL du site sont requis" });
    return;
  }

  const newCategory = { name: categoryName };
  const newSite = { url: siteUrl, image: siteImage || null };

  categoryModel.addCategoryWithSite(
    newCategory,
    newSite,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (err: any, result: any) => {
      if (err) {
        console.error("Erreur lors de l'ajout:", err);
        if (err.code === "ER_DUP_ENTRY") {
          res
            .status(409)
            .json({ message: "Cette catégorie ou ce site existe déjà" });
          return;
        }
        res.status(500).json({ message: "Erreur serveur" });
        return;
      }

      res.status(201).json({
        message: "Catégorie et site ajoutés avec succès",
        data: result,
      });
    }
  );
};

export default {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  createCategoryWithSite,
};
