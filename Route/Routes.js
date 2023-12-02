import express from "express";
import { Login, Register } from "../Controller/auth.js";
import { AddToDo, EditToDo, GetAllToDo, GetById } from "../Controller/List.js";

const router = express.Router()

router.route("/register").post(Register)
router.route("/login").post(Login)

router.route("/add").post(AddToDo)
router.route("/getbyid/:id").get(GetById)
router.route("/edit/:id").put(EditToDo)
router.route("/getalltodo").get(GetAllToDo)

export default router