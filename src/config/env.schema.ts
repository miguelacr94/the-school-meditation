import * as Joi from "joi";

export const envSchema = Joi.object({
  // Server Configuration
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  // Database Configuration
  MONGODB_URI: Joi.string().required().description("MongoDB connection string"),

  // JWT Configuration
  JWT_SECRET: Joi.string().required().description("JWT Secret Key"),
  JWT_EXPIRES_IN: Joi.string().default("1d").description("JWT Expiration Time"),
});
