// src/controllers/user.controller.js
import { createUser } from "../models/user-model.js";

const registerUser = (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).send("All fields are required");
  }

  createUser({ username, email, phoneNumber, password }, (err) => {
    if (err) {
      console.error("Error adding user to the database: ", err);
      return res.status(500).send("Error registering new user");
    }
    res.send("User registered successfully");
  });
};

export { registerUser };
