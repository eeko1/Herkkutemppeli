import express from "express";
import {
  fetchProducts,
  fetchProduct,
  modifyProduct,
} from "../controllers/product-controller.js";

const router = express.Router();

/**
 * @api {get} /api/products Get all products
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiSuccess {Object[]} products Array of product objects.
 */
router.get("/", fetchProducts);

/**
 * @api {get} /api/products/:productId Get a product by ID
 * @apiName GetProduct
 * @apiGroup Products
 *
 * @apiParam {Number} productId Product ID.
 * @apiSuccess {Object} product Product object.
 */
router.get("/:productId", fetchProduct);

/**
 * @api {put} /api/products/:productId Modify a product
 * @apiName ModifyProduct
 * @apiGroup Products
 *
 * @apiParam {Number} productId Product ID.
 * @apiSuccess {String} message Success message.
 */
router.put("/:productId", modifyProduct);

export default router;
