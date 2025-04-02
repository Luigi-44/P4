import express from "express";
import * as sitesByCategoriesController from "../controller/sitesBycategoriesController";

const router = express.Router();

router.get(
  "/sitesbycategories",
  sitesByCategoriesController.getDivertissementSites
);

export default router;
