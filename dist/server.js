"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts (Main Server File)
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const personalityRoutes_1 = __importDefault(require("./routes/personalityRoutes"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const docsRoutes_1 = __importDefault(require("./routes/docsRoutes"));
const metricsRoutes_1 = __importDefault(require("./routes/metricsRoutes"));
const requestLogger_1 = require("./middleware/requestLogger");
const errorHandler_1 = require("./middleware/errorHandler");
const security_1 = require("./middleware/security");
const metrics_1 = require("./middleware/metrics");
const logger_1 = require("./utils/logger");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(...security_1.securityMiddlewares);
app.use(metrics_1.metricsMiddleware);
app.use(requestLogger_1.requestLogger);
app.use(healthRoutes_1.default);
app.use(docsRoutes_1.default);
app.use(metricsRoutes_1.default);
app.use("/api", personalityRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Personality Assessment API");
});
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});
app.use(errorHandler_1.errorHandler);
(0, database_1.connectToDatabase)()
    .then(() => {
    app.listen(port, () => {
        logger_1.logger.info("server.start", { port });
    });
})
    .catch((error) => {
    logger_1.logger.error("server.start_failed", { error: error.message });
    process.exit(1);
});
