const required = (key: string) => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env = {
  port: required("PORT"),
  appUrl: required("APP_URL"),
  databaseUrl: required("DATABASE_URL"),
  dbSslRejectUnauthorized: required("DB_SSL_REJECT_UNAUTHORIZED") === "true",
  dbAutoMigrate: required("DB_AUTO_MIGRATE") === "true",
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: required("JWT_EXPIRES_IN"),
  openRouterApiKey: required("OPENROUTER_API_KEY"),
  openRouterBaseUrl: required("OPENROUTER_BASE_URL"),
  openRouterModel: required("OPENROUTER_MODEL"),
}
