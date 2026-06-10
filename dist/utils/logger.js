"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const util_1 = require("util");
const formatMetadata = (metadata) => {
    if (!metadata || Object.keys(metadata).length === 0) {
        return undefined;
    }
    return Object.entries(metadata).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
};
const log = (level, message, metadata) => {
    const payload = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...formatMetadata(metadata),
    };
    if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify(payload));
    }
    else {
        console.log(`${payload.timestamp} [${level}] ${message}`);
        if (metadata) {
            console.log((0, util_1.inspect)(metadata, { depth: 5, colors: true }));
        }
    }
};
exports.logger = {
    info: (message, metadata) => log("info", message, metadata),
    warn: (message, metadata) => log("warn", message, metadata),
    error: (message, metadata) => log("error", message, metadata),
    debug: (message, metadata) => log("debug", message, metadata),
};
