import pool from "./db"

export const initializeDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(40) NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS trips (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      start_location VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      budget INTEGER NOT NULL DEFAULT 0,
      days INTEGER NOT NULL DEFAULT 1,
      interests TEXT,
      plan JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_trips_user_created_at
    ON trips(user_id, created_at DESC);
  `)
}
