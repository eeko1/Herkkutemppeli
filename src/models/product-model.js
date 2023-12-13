import db from "../config/database.js";

/**
 * Get all products from the database
 *
 * @returns {Promise<Array<object>>} - Array of product objects
 */
const getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Products ORDER BY product_category_id ASC"
  );
  return rows;
};

/**
 * Get a product by its ID from the database
 *
 * @param {number} productId - ID of the product to retrieve
 * @returns {Promise<object>} - Product object
 */
const getProductById = async (productId) => {
  const [rows] = await db.query("SELECT * FROM Products WHERE product_id = ?", [
    productId,
  ]);
  return rows[0];
};

/**
 * Update a product in the database
 *
 * @param {number} productId - ID of the product to update
 * @param {object} productData - Object containing updated product data
 * @param {string} productData.productName - Updated product name
 * @param {string} productData.productDescription - Updated product description
 * @param {string} productData.productImage - Updated product image URL
 * @param {number} productData.productCategory - Updated product category ID
 * @param {string} productData.productAllergens - Updated product allergens
 * @param {number} productData.productPrice - Updated product price
 * @throws {Error} - Throws an error if the update process fails
 */
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
      SET product_name = IFNULL(?, product_name), -- Use existing value if new value is null
          product_description = IFNULL(?, product_description), 
          product_image = IFNULL(?, product_image), 
          product_category_id = IFNULL(?, product_category_id),
          product_allergens = IFNULL(?, product_allergens),
          product_price = IFNULL(?, product_price)
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
