import express from "express";
import { getMetrics } from "../middleware/metrics";

const router = express.Router();

router.get("/metrics", (_req, res) => {
  res.json(getMetrics());
});

export default router;
