// src/routes/user.routes.js
import express from "express";
import { registerUser } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/signup", registerUser);

export default router;
