import { NextFunction, Request, Response } from "express";

const API_KEY_NAME = "PERSONALITY_API_KEY";

function getApiKeyFromHeader(req: Request): string | undefined {
  const headerValue = req.get("x-api-key") || req.get("authorization");

  if (!headerValue) {
    return undefined;
  }

  if (headerValue.toLowerCase().startsWith("bearer ")) {
    return headerValue.slice(7).trim();
  }

  return headerValue.trim();
}

export const requireApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const configuredKey = process.env[API_KEY_NAME];

  if (!configuredKey) {
    return next();
  }

  const providedKey = getApiKeyFromHeader(req);

  if (!providedKey || providedKey !== configuredKey) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Provide a valid API key." });
  }

  next();
};
