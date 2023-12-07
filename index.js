import express from "express";
import mysql from "mysql";
import path from "path";
import { fileURLToPath } from 'url';

// Create Express app
const app = express();
const port = 3000;

// Set up connection to the database
const db = mysql.createConnection({
  host: "localhost", // Replace with your host, often 'localhost'
  user: "root", // Replace with your database username, often 'root'
  password: "RootWord1Salasana1", // Replace with your database password
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

app.post('/updateUser', (req, res) => {
  const { newUsername, newEmail, newPhoneNumber, newPassword } = req.body;

  const updateUserQuery = `UPDATE Users SET email = ?, phonenumber = ?, password = ? WHERE fullname = ?`;

  db.query(updateUserQuery, [newEmail, newPhoneNumber, newPassword, newUsername], (error, results, fields) => {
      if (error) {
          console.error('Error updating user: ' + error.stack);
          res.status(500).send('Error updating user');
          return;
      }
      res.status(200).send('User information updated successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});