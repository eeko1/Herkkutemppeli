import db from "../config/database.js";

const getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Products ORDER BY product_category_id ASC"
  );
  return rows;
};

export { getAllProducts };
