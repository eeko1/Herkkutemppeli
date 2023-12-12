import {
  getAllProducts,
  getProductById,
  updateProduct,
} from "../models/product-model.js";

const fetchProducts = async (req, res) => {
  try {
    const results = await getAllProducts();
    res.json(results);
  } catch (err) {
    res.status(500).send("Error fetching products from database");
  }
};

const fetchProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.status(500).send("Error fetching product from database");
  }
};

const modifyProduct = async (req, res) => {
  try {
    await updateProduct(req.params.productId, req.body);
    res.status(200).send("Product updated successfully");
  } catch (err) {
    res.status(500).send("Error updating product in database");
  }
};

export { fetchProducts, fetchProduct, modifyProduct };
