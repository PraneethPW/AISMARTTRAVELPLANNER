import { Pool } from "pg";
import { env } from "./env";

if (!env.databaseUrl.startsWith("postgresql://") && !env.databaseUrl.startsWith("postgres://")) {
  throw new Error("DATABASE_URL must start with postgresql:// or postgres://. Check Railway variables are separate key/value entries.");
}

const databaseUrl = new URL(env.databaseUrl);
databaseUrl.searchParams.delete("sslmode");

const pool = new Pool({
  connectionString: databaseUrl.toString(),
  ssl: {
    rejectUnauthorized: env.dbSslRejectUnauthorized
  }
});

export default pool;
