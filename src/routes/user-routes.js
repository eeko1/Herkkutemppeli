import express from "express";
import { register, login } from "../controllers/user-controller.js";

const router = express.Router();

/**
 * @api {post} /user/signup Register a new user
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Number} userId ID of the registered user.
 */
router.post("/signup", register);

/**
 * @api {post} /user/login Log in a user
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Object} user User object.
 */
router.post("/login", login);

export default router;
