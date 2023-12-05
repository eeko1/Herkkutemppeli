// src/models/product.model.js
import db from "../config/database.js";

const getAllProducts = (callback) => {
  db.query("SELECT * FROM Products ORDER BY product_category_id ASC", callback);
};

export { getAllProducts };
