import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router = Router();

//api/users
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
