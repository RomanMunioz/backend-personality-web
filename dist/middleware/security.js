"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityMiddlewares = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const sanitize_1 = require("./sanitize");
exports.securityMiddlewares = [
    (0, helmet_1.default)(),
    (0, cors_1.default)({
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
    (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            error: "Too many requests, please try again later.",
        },
    }),
    sanitize_1.sanitizePayload,
];
