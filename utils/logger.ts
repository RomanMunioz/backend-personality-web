import { inspect } from "util";

interface Metadata {
  [key: string]: unknown;
}

const formatMetadata = (metadata?: Metadata) => {
  if (!metadata || Object.keys(metadata).length === 0) {
    return undefined;
  }
  return Object.entries(metadata).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {} as Metadata);
};

const log = (level: string, message: string, metadata?: Metadata) => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...formatMetadata(metadata),
  };

  if (process.env.NODE_ENV === "production") {
    console.log(JSON.stringify(payload));
  } else {
    console.log(`${payload.timestamp} [${level}] ${message}`);
    if (metadata) {
      console.log(inspect(metadata, { depth: 5, colors: true }));
    }
  }
};

export const logger = {
  info: (message: string, metadata?: Metadata) =>
    log("info", message, metadata),
  warn: (message: string, metadata?: Metadata) =>
    log("warn", message, metadata),
  error: (message: string, metadata?: Metadata) =>
    log("error", message, metadata),
  debug: (message: string, metadata?: Metadata) =>
    log("debug", message, metadata),
};
