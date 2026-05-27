import { Pool } from "pg";
import { env } from "./env";

const databaseUrl = new URL(env.databaseUrl);
databaseUrl.searchParams.delete("sslmode");

const pool = new Pool({
  connectionString: databaseUrl.toString(),
  ssl: {
    rejectUnauthorized: env.dbSslRejectUnauthorized
  }
});

export default pool;
