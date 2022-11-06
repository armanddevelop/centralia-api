import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

export const configDev = {
  port: process.env.PORT || 8000,
  host: process.env.HOST || "http://localhost",
  dbUrl: process.env.DB_URL,
  serverHost: process.env.SERVER_HOST || "http://localhost:8001",
  publicRoute: process.env.PUBLIC_ROUTE || "/app",
  commonID: uuidv4(),
};
