import express from "express"
import { createUser, getAllUsers, getOneUser, updateUser, deleteUser } from "../controllers/userController.js";
import  upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/create", upload.single('file') ,createUser)

router.get("/users", getAllUsers)

router.get("/user/:id", getOneUser)

router.put("/update/:id", updateUser)

router.delete("/delete/:id", deleteUser)

export default router