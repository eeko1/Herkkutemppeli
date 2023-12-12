import express from "express";
import {
  fetchProducts,
  fetchProduct,
  modifyProduct,
} from "../controllers/product-controller.js";

const router = express.Router();

router.get("/", fetchProducts);
router.get("/:productId", fetchProduct);
router.put("/:productId", modifyProduct);

export default router;
