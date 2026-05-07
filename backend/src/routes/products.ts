import express from "express";
import {
  getAllProducts,
  getProductBySlug,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);

export default router;
