import express from "express"
import { createUser, getAllUsers, getOneUser, updateUser ,deleteUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/create", createUser)
router.get("/users", getAllUsers)
router.get("/user/:id", getOneUser)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)

export default router