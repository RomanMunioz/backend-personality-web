import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { sanitizePayload } from "./sanitize";

export const securityMiddlewares = [
  helmet(),
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: "Too many requests, please try again later.",
    },
  }),
  sanitizePayload,
];
