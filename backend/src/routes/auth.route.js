import { Router } from "express";
import {
  signUp,
  signIn,
  logOut,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", authMiddleware, logOut);
router.put("/update-profile", authMiddleware, updateProfile);
router.get("/check", authMiddleware, checkAuth);

export default router;
