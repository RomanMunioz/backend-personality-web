"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
const logger_1 = require("../utils/logger");
function errorHandler(error, req, res, next) {
    const statusCode = error instanceof AppError_1.AppError ? error.statusCode : 500;
    const requestId = req.requestId;
    logger_1.logger.error("error.handler", {
        message: error.message,
        statusCode,
        requestId,
        stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
    });
    const responseBody = {
        error: error.message || "Internal Server Error",
    };
    if (process.env.NODE_ENV !== "production") {
        responseBody.stack = error.stack;
    }
    res.status(statusCode).json(responseBody);
}
