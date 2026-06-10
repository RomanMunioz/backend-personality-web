"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetrics = exports.metricsMiddleware = void 0;
const requests = {
    total: 0,
    status5xx: 0,
    status4xx: 0,
};
const metricsMiddleware = (_req, res, next) => {
    requests.total += 1;
    res.on("finish", () => {
        if (res.statusCode >= 500)
            requests.status5xx += 1;
        if (res.statusCode >= 400 && res.statusCode < 500)
            requests.status4xx += 1;
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
const getMetrics = () => ({
    requests,
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
});
exports.getMetrics = getMetrics;
