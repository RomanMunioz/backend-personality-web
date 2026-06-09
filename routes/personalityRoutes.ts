// routes/personalityRoutes.ts
import express from "express";
import { analyzePersonality } from "../Controllers/personalityController";
import { asyncHandler } from "../middleware/asyncHandler";
import { requireApiKey } from "../middleware/auth";

const router = express.Router();

router.post("/assess", requireApiKey, asyncHandler(analyzePersonality));

export default router;
