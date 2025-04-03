import express from "express";
import * as sitesByCategoriesController from "../controller/sitesBycategoriesController";

const router = express.Router();

router.get(
  "/sitesbycategories/allcategories",
  sitesByCategoriesController.getAllSitesByCategories
);
router.get(
  "/sitesbycategories/divertissement",
  sitesByCategoriesController.getDivertissementSites
);
router.get(
  "/sitesbycategories/facturation",
  sitesByCategoriesController.getFacturationSites
);

export default router;
