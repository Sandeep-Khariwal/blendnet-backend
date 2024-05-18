import express from "express";
import { Login, Register } from "../Controller/auth.js";

const router = express.Router()

router.route("/signup").post(Register)
router.route("/login").post(Login)

export default router