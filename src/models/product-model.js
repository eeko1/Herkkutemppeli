import db from "../config/database.js";

const getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Products ORDER BY product_category_id ASC"
  );
  return rows;
};

const getProductById = async (productId) => {
  const [rows] = await db.query("SELECT * FROM Products WHERE product_id = ?", [
    productId,
  ]);
  return rows[0];
};

const updateProduct = async (productId, productData) => {
  const {
    productName,
    productDescription,
    productImage,
    productCategory,
    productAllergens,
    productPrice,
  } = productData;
  await db.query(
    "UPDATE Products SET product_name = ?, product_description = ?, product_image = ?, product_category_id = ?, product_allergens = ?, product_price = ? WHERE product_id = ?",
    [
      productName,
      productDescription,
      productImage,
      productCategory,
      productAllergens,
      productPrice,
      productId,
    ]
  );
};

export { getAllProducts, getProductById, updateProduct };
