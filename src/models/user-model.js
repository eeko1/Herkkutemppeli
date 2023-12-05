// src/models/user.model.js
import db from "../config/database.js";
import bcrypt from "bcryptjs";

const createUser = (user, callback) => {
  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if (err) return callback(err);

    const query = `INSERT INTO Users (fullname, password, email, phonenumber, profile_picture, user_level_id) VALUES (?, ?, ?, ?, 'default.jpg', 1)`;
    db.query(
      query,
      [user.username, hashedPassword, user.email, user.phoneNumber],
      callback
    );
  });
};

export { createUser };
