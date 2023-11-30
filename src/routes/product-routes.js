// src/routes/product.routes.js
import express from "express";
import { fetchProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/api/products", fetchProducts);

export default router;
