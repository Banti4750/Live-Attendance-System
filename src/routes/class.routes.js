import express from "express";
import { addClassControllers, getClassControllers } from "../controllers/class.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";
const router = express.Router();
router.post('/add-class' , auth , addClassControllers)
router.get('/get-classes' , auth , getClassControllers)
export default router;