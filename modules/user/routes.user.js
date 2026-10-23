
import { Router } from "express";

import {
  signup,
  upsertUser,
  getUserByEmail,
  getUserById,
} from "./user.controller.js";

const router = Router();

router.post("/signup", signup);
router.get("/by-email", getUserByEmail);
router.put("/:id", upsertUser);
router.get("/:id", getUserById);

export default router;
