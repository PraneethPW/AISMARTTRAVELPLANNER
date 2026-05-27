import "dotenv/config"
import app from "./app"
import { env } from "./config/env"
import { initializeDatabase } from "./config/initDb"

const startServer = async () => {
  if (env.dbAutoMigrate) {
    await initializeDatabase()
    console.log("Database ready")
  }

  app.listen(env.port, () => {
    console.log(`Server running on ${env.port}`)
  })
}

startServer().catch((error) => {
  console.error("Server startup failed:", error)
  process.exit(1)
})
