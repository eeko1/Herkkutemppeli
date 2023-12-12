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
  try {
    console.log("Updating product:", productId, productData);

    const {
      productName,
      productDescription,
      productImage,
      productCategory,
      productAllergens,
      productPrice,
    } = productData;

    const sql = `
      UPDATE Products
      SET product_name = ?, 
          product_description = ?, 
          product_image = IFNULL(?, product_image),  -- Use existing value if new value is null
          product_category_id = ?, 
          product_allergens = ?, 
          product_price = ?
      WHERE product_id = ?
    `;

    console.log("SQL Query:", sql);

    await db.query(sql, [
      productName,
      productDescription,
      productImage, // This value may be null
      productCategory,
      productAllergens,
      productPrice,
      productId,
    ]);

    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export { getAllProducts, getProductById, updateProduct };
