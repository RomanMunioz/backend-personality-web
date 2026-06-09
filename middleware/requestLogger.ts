import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { randomUUID } from "crypto";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId =
    typeof randomUUID === "function"
      ? randomUUID()
      : `${Date.now()}-${Math.random()}`;
  (req as any).requestId = requestId;

  const start = Date.now();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info("request.completed", {
      requestId,
      method,
      path: originalUrl,
      statusCode: res.statusCode,
      durationMs: duration,
    });
  });

  logger.info("request.started", {
    requestId,
    method,
    path: originalUrl,
    body: req.body,
  });

  next();
};
