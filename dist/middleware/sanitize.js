"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePayload = void 0;
const sanitizeString = (value) => value.replace(/<script.*?>.*?<\/script>/gi, "").replace(/[<>]/g, "");
const sanitizeObject = (value) => {
    if (typeof value === "string") {
        return sanitizeString(value);
    }
    if (Array.isArray(value)) {
        return value.map(sanitizeObject);
    }
    if (value !== null && typeof value === "object") {
        return Object.entries(value).reduce((acc, [key, item]) => {
            if (key.startsWith("$") || key.includes(".")) {
                return acc;
            }
            acc[key] = sanitizeObject(item);
            return acc;
        }, {});
    }
    return value;
};
const sanitizePayload = (req, res, next) => {
    req.body = sanitizeObject(req.body);
    req.query = sanitizeObject(req.query);
    req.params = sanitizeObject(req.params);
    next();
};
exports.sanitizePayload = sanitizePayload;
