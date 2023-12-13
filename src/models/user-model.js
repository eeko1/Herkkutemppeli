import pool from "../config/database.js";

/**
 * Find user by email in the database
 *
 * @param {string} email - Email address of the user
 * @returns {Promise<object>} - User object
 */
async function findByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

/**
 * Create a new user in the database
 *
 * @param {string} username - Username of the new user
 * @param {string} email - Email address of the new user
 * @param {string} phoneNumber - Phone number of the new user
 * @param {string} hashedPassword - Hashed password of the new user
 * @returns {Promise<void>} - Promise resolved after user creation
 */
async function create(username, email, phoneNumber, hashedPassword) {
  await pool.query(
    'INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id) VALUES (?, ?, ?, ?, "default.png", 1)',
    [username, hashedPassword, email, phoneNumber]
  );
}

export default { findByEmail, create };
