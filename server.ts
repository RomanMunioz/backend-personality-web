// server.ts (Main Server File)
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import personalityRoutes from "./routes/personalityRoutes";
import healthRoutes from "./routes/healthRoutes";
import docsRoutes from "./routes/docsRoutes";
import metricsRoutes from "./routes/metricsRoutes";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { securityMiddlewares } from "./middleware/security";
import { metricsMiddleware } from "./middleware/metrics";
import { logger } from "./utils/logger";
import { connectToDatabase } from "./config/database";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(...securityMiddlewares);
app.use(metricsMiddleware);
app.use(requestLogger);
app.use(healthRoutes);
app.use(docsRoutes);
app.use(metricsRoutes);
app.use("/api", personalityRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Personality Assessment API");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      logger.info("server.start", { port });
    });
  })
  .catch((error) => {
    logger.error("server.start_failed", { error: (error as Error).message });
    process.exit(1);
  });
