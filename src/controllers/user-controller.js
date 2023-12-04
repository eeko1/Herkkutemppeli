import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create(
      req.body.username,
      req.body.email,
      req.body.phoneNumber,
      hashedPassword
    );
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error registering new user");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ userId: user.user_id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};
