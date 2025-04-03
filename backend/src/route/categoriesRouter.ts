import express from "express";
import * as categoryController from "../controller/categoriesController";

const router = express.Router();

router.get("/categories", categoryController.getCategories);
router.post("/categories", categoryController.addCategory);
router.delete("/categories/:id", categoryController.deleteCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.post("/categories/site", categoryController.createCategoryWithSite);

export default router;
