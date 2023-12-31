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

app.post("/api/confirm-order", async (req, res) => {
  try {
    const { order_id } = req.body;
    const [results] = await pool.query(
      "UPDATE Orders SET status = 'confirmed' WHERE order_id = ?",
      [order_id]
    );
    console.log("Order confirmed successfully!");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).send("Error confirming order");
  }
});

app.get("/api/orderslist", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT Orders.*, GROUP_CONCAT(Ticket.product_id) AS ordered_items " +
        "FROM Orders " +
        "LEFT JOIN Ticket ON Orders.order_id = Ticket.order_id " +
        "WHERE Orders.status = 'pending' " +
        "GROUP BY Orders.order_id"
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching orders from database:", err);
    res.status(500).send("Error fetching orders from database");
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    console.log("reqbody", req.body);
    const { order_id, user_id } = req.body;
    const [results] = await pool.query(
      "INSERT INTO Orders (order_id, user_id) VALUES (?, ?)",
      [order_id, user_id]
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
    const {
      currentUsername,
      newUsername,
      newEmail,
      newPhoneNumber,
      newPassword,
    } = req.body;

    console.log("Received request with data:", req.body);

    const updateUserQuery =
      "UPDATE Users SET email = ?, phonenumber = ?, password = ?, fullname = ? WHERE fullname = ?";

    await pool.query(updateUserQuery, [
      newEmail,
      newPhoneNumber,
      newPassword,
      newUsername,
      currentUsername, // Use currentUsername to identify the user
    ]);

    console.log("User information updated successfully");
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
      newProductAllergens,
      newProductPrice,
    } = req.body;

    const updateProductQuery =
      "UPDATE Products SET product_name = ?, product_description = ?, product_allergens = ?, product_price = ? WHERE product_id = ?";

    await pool.query(updateProductQuery, [
      newProductName,
      newProductDescription,
      newProductAllergens,
      newProductPrice,
      product_id,
    ]);

    res.status(200).send("Product information updated successfully");
  } catch (err) {
    console.error("Error updating product information:", err);
    res.status(500).send("Error updating product information");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
