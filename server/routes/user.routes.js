import express from "express";
import protectRoute from "../middleware/protect.route.js";
import { getProfile, updateProfile } from "../controllers/user.controllers.js";

const router = express.Router();

router
  .route("/profile")
  .get(protectRoute, getProfile)
  .put(protectRoute, updateProfile);

export default router;
