import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProducts,
  deleteProduct,
  getTopProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router.route("/:id").get(getProductsById).put(protect, admin, updateProducts);
router.route("/:id/delete").put(protect, admin, deleteProduct);

export default router;
