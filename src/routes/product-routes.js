import express from "express";
import { fetchProducts } from "../controllers/product-controller.js";

const router = express.Router();

router.get("/", fetchProducts);

export default router;
