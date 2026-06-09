import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const requestId = (req as any).requestId;

  logger.error("error.handler", {
    message: error.message,
    statusCode,
    requestId,
    stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
  });

  const responseBody: Record<string, unknown> = {
    error: error.message || "Internal Server Error",
  };

  if (process.env.NODE_ENV !== "production") {
    responseBody.stack = error.stack;
  }

  res.status(statusCode).json(responseBody);
}
