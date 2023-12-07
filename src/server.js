import mysql from "mysql";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";

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

app.get("/api/latest-order-id", (req, res) => {
  db.query(
    "SELECT MAX(order_id) AS latest_order_id FROM Orders",
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send("Error fetching latest order ID from database");
      }
      const latestOrderId = results[0].latest_order_id || 0;
      res.json({ latestOrderId });
    }
  );
});

app.post("/api/orders", async (req, res) => {
  const { order_id } = req.body;

  const values = [order_id];

  db.query(
    "INSERT INTO Orders (order_id) VALUES (?)",
    [values],
    (err, results) => {
      if (err) {
        console.error("Error inserting order data: ", err);
        return res.status(500).send("Error during checkout: " + err.message);
      }

      console.log("Order data inserted successfully!");
      res.status(200).send("Order created successfully!"); // Add this line
    }
  );
});

app.post("/api/checkout", (req, res) => {
  const { order_id, products } = req.body;

  // Log the received request body for debugging
  console.log("Received request body:", req.body);

  // Assuming the Ticket table structure has columns order_id, product_id, and quantity
  const values = products.map((product) => [order_id, product.product_id]);

  db.query(
    "INSERT INTO Ticket (order_id, product_id) VALUES ?",
    [values],
    (err, results) => {
      if (err) {
        console.error("Error inserting ticket data: ", err);
        return res.status(500).send("Error during checkout: " + err.message);
      }

      console.log("Ticket data inserted successfully!");
      res.sendStatus(200); // Send a success status
    }
  );
});
// API endpoint to get products from the database
app.get("/api/products", (req, res) => {
  db.query(
    "SELECT * FROM Products ORDER BY product_category_id ASC",
    (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching products from database");
      }
      res.json(results);
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
