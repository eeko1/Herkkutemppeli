import mysql from "mysql";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";
import pool from "./config/database.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, "..", "public");

app.use(express.static(publicDirectoryPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoutes);
app.use("/api/products", productRoutes);

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
  // Serve static files from 'public' directory
});

app.use(express.json());

app.get("/api/latest-order-id", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT MAX(order_id) AS latest_order_id FROM Orders"
    );
    const latestOrderId = results[0].latest_order_id || 0;
    res.json({ latestOrderId });
  } catch (err) {
    console.error("Error fetching latest order ID from database:", err);
    res.status(500).send("Error fetching latest order ID from database");
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { order_id } = req.body;
    const [results] = await pool.query(
      "INSERT INTO Orders (order_id) VALUES (?)",
      [order_id]
    );
    console.log("Order data inserted successfully!");
    res.status(200).send("Order created successfully!");
  } catch (err) {
    console.error("Error inserting order data:", err);
    res.status(500).send("Error during checkout: " + err.message);
  }
});

app.post("/api/checkout", async (req, res) => {
  try {
    const { order_id, products } = req.body;
    const values = products.map((product) => [order_id, product.product_id]);
    const [results] = await pool.query(
      "INSERT INTO Ticket (order_id, product_id) VALUES ?",
      [values]
    );
    console.log("Ticket data inserted successfully!");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error inserting ticket data:", err);
    res.status(500).send("Error during checkout: " + err.message);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM Products ORDER BY product_category_id ASC"
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching products from database:", err);
    res.status(500).send("Error fetching products from database");
  }
});

app.post("/user/update", async (req, res) => {
  try {
    const { newUsername, newEmail, newPhoneNumber, newPassword } = req.body;

    const updateUserQuery =
      "UPDATE Users SET email = ?, phonenumber = ?, password = ? WHERE fullname = ?";
    
    await pool.query(updateUserQuery, [newEmail, newPhoneNumber, newPassword, newUsername]);

    res.status(200).send("User information updated successfully");
  } catch (err) {
    console.error("Error updating user information:", err);
    res.status(500).send("Error updating user information");
  }
});

app.post("/api/products/update", async (req, res) => {
  try {
    const {
      product_id,
      newProductName,
      newProductDescription,
      newProductCategory,
      newProductAllergens,
      newProductPrice
    } = req.body;

    const updateProductQuery = `
      UPDATE Products 
      SET 
          product_name = ?,
          product_description = ?,
          product_category_id = ?,
          product_allergens = ?,
          product_price = ?
      WHERE 
          product_id = ?`;

    const [result] = await pool.query(updateProductQuery, [
      newProductName,
      newProductDescription,
      newProductCategory,
      newProductAllergens,
      newProductPrice,
      product_id
    ]);

    if (result.affectedRows > 0) {
      res.status(200).send("Product information updated successfully");
    } else {
      res.status(404).send("Product not found or no changes applied");
    }
  } catch (err) {
    console.error("Error updating product information:", err);
    res.status(500).send("Error updating product information: " + err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
