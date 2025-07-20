CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  "acceptTerms" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "passwordRecoveryToken" VARCHAR(255) DEFAULT NULL
);