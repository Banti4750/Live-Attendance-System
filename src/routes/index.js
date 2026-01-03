import { Router } from "express";

const router = Router();

// Import routes here
import userRoutes from "./user.routes.js";
router.use("/auth", userRoutes);

router.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default router;
