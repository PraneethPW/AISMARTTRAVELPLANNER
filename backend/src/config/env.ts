const required = (key: string) => {
  const value = process.env[key]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

const optional = (key: string, fallback: string) => {
  return process.env[key]?.trim() || fallback
}

export const env = {
  port: optional("PORT", "5000"),
  appUrl: optional("APP_URL", "http://localhost:5173"),
  corsOrigins: optional(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,https://aismartplanner.vercel.app"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  databaseUrl: required("DATABASE_URL"),
  dbSslRejectUnauthorized: optional("DB_SSL_REJECT_UNAUTHORIZED", "false") === "true",
  dbAutoMigrate: optional("DB_AUTO_MIGRATE", "true") === "true",
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: optional("JWT_EXPIRES_IN", "7d"),
  openRouterApiKey: required("OPENROUTER_API_KEY"),
  openRouterBaseUrl: optional("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1"),
  openRouterModel: optional("OPENROUTER_MODEL", "openai/gpt-4o-mini"),
}
