import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/user.controllers.js";

const router = express.Router();

router
  .route("/profile")
  .get(protectRoute, getProfile)
  .put(protectRoute, updateProfile);

export default router;
