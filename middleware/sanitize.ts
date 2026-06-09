import { NextFunction, Request, Response } from "express";

const sanitizeString = (value: string) =>
  value.replace(/<script.*?>.*?<\/script>/gi, "").replace(/[<>]/g, "");

const sanitizeObject = (value: unknown): unknown => {
  if (typeof value === "string") {
    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeObject);
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value).reduce(
      (acc, [key, item]) => {
        if (key.startsWith("$") || key.includes(".")) {
          return acc;
        }
        acc[key] = sanitizeObject(item);
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }

  return value;
};

export const sanitizePayload = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.body = sanitizeObject(req.body) as typeof req.body;
  req.query = sanitizeObject(req.query) as typeof req.query;
  req.params = sanitizeObject(req.params) as typeof req.params;
  next();
};
