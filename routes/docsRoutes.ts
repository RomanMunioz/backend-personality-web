import express from "express";

const router = express.Router();

router.get("/docs", (_req, res) => {
  res.json({
    title: "Personality Assessment API",
    version: "1.0.0",
    endpoints: ["POST /api/assess", "GET /health", "GET /ready", "GET /docs"],
  });
});

export default router;
