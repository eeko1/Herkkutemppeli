import pool from "../config/database.js";

async function findByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

async function create(username, email, phoneNumber, hashedPassword) {
  await pool.query(
    'INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id) VALUES (?, ?, ?, ?, "default.png", 1)',
    [username, hashedPassword, email, phoneNumber]
  );
}

export default { findByEmail, create };
