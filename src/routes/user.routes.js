import express from "express";
import { loginControllers, meControllers, signupControllers } from "../controllers/user.controller.js";
const router = express.Router();

router.post('/signup' , signupControllers)
router.post('/login' , loginControllers)
router.get('/me' , meControllers)

export default router;