import express from "express";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import cors from "cors";

// Create Express app
const app = express();
const port = 3000;

// Set up connection to the database
const db = mysql.createConnection({
  host: "localhost", // Replace with your host, often 'localhost'
  user: "root", // Replace with your database username, often 'root'
  password: "2345", // Replace with your database password
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

// Login

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  // Validate the inputs (you can add more complex validation)
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).send("All fields are required");
  }

  // Hash the password before storing it
  // You can use bcrypt for hashing
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      // Handle error scenario
      return res.status(500).send("Error in password hashing");
    }

    // Insert the new user into the database
    const query = `INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id) VALUES (?, ?, ?, ?, 'default.jpg', 1)`;

    db.query(
      query,
      [username, hashedPassword, email, phoneNumber],
      (err, result) => {
        if (err) {
          console.error("Error adding user to the database: ", err);
          return res.status(500).send("Error registering new user");
        }
        res.send("User registered successfully");
      }
    );
  });
});
