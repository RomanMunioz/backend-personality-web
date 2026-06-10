"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../utils/logger");
const crypto_1 = require("crypto");
const requestLogger = (req, res, next) => {
    const requestId = typeof crypto_1.randomUUID === "function"
        ? (0, crypto_1.randomUUID)()
        : `${Date.now()}-${Math.random()}`;
    req.requestId = requestId;
    const start = Date.now();
    const { method, originalUrl } = req;
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger_1.logger.info("request.completed", {
            requestId,
            method,
            path: originalUrl,
            statusCode: res.statusCode,
            durationMs: duration,
        });
    });
    logger_1.logger.info("request.started", {
        requestId,
        method,
        path: originalUrl,
        body: req.body,
    });
    next();
};
exports.requestLogger = requestLogger;
