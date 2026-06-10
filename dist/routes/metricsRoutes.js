"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metrics_1 = require("../middleware/metrics");
const router = express_1.default.Router();
router.get("/metrics", (_req, res) => {
    res.json((0, metrics_1.getMetrics)());
});
exports.default = router;
