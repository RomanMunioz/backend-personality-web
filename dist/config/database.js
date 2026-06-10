"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
async function connectToDatabase() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        logger_1.logger.warn('database.skipped', { reason: 'MONGODB_URI is not set' });
        return;
    }
    try {
        await mongoose_1.default.connect(mongoUri);
        logger_1.logger.info('database.connected', { uri: mongoUri.replace(/:[^:@]+@/, ':***@') });
    }
    catch (error) {
        logger_1.logger.error('database.connection_failed', { error: error.message });
        throw error;
    }
}
