import "./instrument"; // must be first import
import config from "./config";
import { logger } from "./logger";
import { app } from "./app";

const PORT = config.port || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
