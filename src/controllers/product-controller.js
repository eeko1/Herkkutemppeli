import { getAllProducts } from "../models/product-model.js";

const fetchProducts = async (req, res) => {
  try {
    const results = await getAllProducts();
    res.json(results);
  } catch (err) {
    res.status(500).send("Error fetching products from database");
  }
};

export { fetchProducts };
