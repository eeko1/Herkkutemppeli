import express from "express";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from 'url';

// Create Express app
const app = express();
const port = 3000;

// Set up connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "RootWord1Salasana1",
  database: "herkkutemppeli",
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

// API endpoint for user login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).send("Error querying the database");
      }

      if (results.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = results[0];

      // Compare password with the hashed password from the database
      if (password === user.password) {
        return res.send("Login successful");
      } else {
        return res.status(401).send("Invalid password");
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});