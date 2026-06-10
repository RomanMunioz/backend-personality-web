"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApiKey = void 0;
const API_KEY_NAME = "PERSONALITY_API_KEY";
function getApiKeyFromHeader(req) {
    const headerValue = req.get("x-api-key") || req.get("authorization");
    if (!headerValue) {
        return undefined;
    }
    if (headerValue.toLowerCase().startsWith("bearer ")) {
        return headerValue.slice(7).trim();
    }
    return headerValue.trim();
}
const requireApiKey = (req, res, next) => {
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
exports.requireApiKey = requireApiKey;
