const express = require("express");
const mysql = require("mysql");
const path = require("path");

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

// Handle form submission for signup
app.post("/signup", (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  // Insert the user data into the Users table
  const newUser = {
    fullname: username,
    email: email,
    phonenumber: phoneNumber,
    password: password,
    profile_picture: 'default_profile_picture.jpg', // Set a default profile picture
    user_level_id: 1, // Set a default user level ID
  };

  db.query("INSERT INTO Users SET ?", newUser, (err, result) => {
    if (err) {
      return res.status(500).send("Error inserting user into database");
    }
    res.status(200).send("User successfully registered!");
  });
});

app.use(express.urlencoded({ extended: true }));
