import { Request, Response, NextFunction } from "express";

const requests = {
  total: 0,
  status5xx: 0,
  status4xx: 0,
};

export const metricsMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  requests.total += 1;

  res.on("finish", () => {
    if (res.statusCode >= 500) requests.status5xx += 1;
    if (res.statusCode >= 400 && res.statusCode < 500) requests.status4xx += 1;
  });

  next();
};

export const getMetrics = () => ({
  requests,
  uptimeSeconds: Math.floor(process.uptime()),
  memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
});
