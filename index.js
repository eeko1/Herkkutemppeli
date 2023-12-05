import express from "express";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";

// Create Express app
const app = express();
const port = 3000;

// Set up connection to the database
const db = mysql.createConnection({
  host: "localhost", // Replace with your host, often 'localhost'
  user: "root", // Replace with your database username, often 'root'
  password: "Rommikola77", // Replace with your database password
  database: "herkkutemppeli", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Serve static files from 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

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
