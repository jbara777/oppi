import express from "express";
import { login , logout, register , userInfo , leaveRequest , updateUserInfo} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/userInfo/:id", userInfo);
router.post("/leave", leaveRequest);
router.put("/updateUser/:id" , updateUserInfo);



export default router;