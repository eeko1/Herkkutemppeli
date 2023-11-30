// src/controllers/product.controller.js
import { getAllProducts } from "../models/product.model.js";

const fetchProducts = (req, res) => {
  getAllProducts((err, results) => {
    if (err) {
      return res.status(500).send("Error fetching products from database");
    }
    res.json(results);
  });
};

export { fetchProducts };
