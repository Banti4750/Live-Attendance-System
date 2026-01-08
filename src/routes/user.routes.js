import express from "express";
import { loginControllers, meControllers, signupControllers } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post('/signup' , signupControllers)
router.post('/login' , loginControllers)
router.get('/me' , auth, meControllers)

export default router;