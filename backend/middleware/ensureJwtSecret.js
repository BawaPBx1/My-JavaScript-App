import fs from "fs";
import { randomBytes } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const envPath = ".env";
const secretKey = "JWT_SECRET";

export const ensureJwtSecret = (req, res, next) => {
  if (process.env[secretKey]) {
    // console.log("✅ JWT_SECRET already exists.");
    return next();
  }
  console.log("🔐 JWT_SECRET is missing, generating a new one...");
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, "");
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  console.log("🔐 JWT_SECRET is missing, generating a new one...");
  if (envContent.includes(`${secretKey}=`)) {
    console.log("✅ JWT_SECRET already defined in .env file.");
    return next();
  }
  console.log("🔐 JWT_SECRET is missing, generating a new one...");
  const newSecret = randomBytes(64).toString("hex");
  const entry = `\n${secretKey}=${newSecret}\n`;

  fs.appendFileSync(envPath, entry);
  console.log("🔐 JWT_SECRET was missing and has been generated.");
  console.log("🔐 JWT_SECRET is missing, generating a new one...");
  dotenv.config();

  return next();
};