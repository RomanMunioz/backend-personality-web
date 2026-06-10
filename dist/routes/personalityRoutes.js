"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/personalityRoutes.ts
const express_1 = __importDefault(require("express"));
const personalityController_1 = require("../Controllers/personalityController");
const asyncHandler_1 = require("../middleware/asyncHandler");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/assess", auth_1.requireApiKey, (0, asyncHandler_1.asyncHandler)(personalityController_1.analyzePersonality));
exports.default = router;
