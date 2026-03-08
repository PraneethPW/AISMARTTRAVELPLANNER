import pool from "../config/db";

export const saveTrip = async (
  start: string,
  destination: string,
  budget: number,
  days: number,
  interests: string,
  plan: any
) => {

  const query = `
  INSERT INTO trips
  (start_location, destination, budget, days, interests, plan)
  VALUES ($1,$2,$3,$4,$5,$6)
  RETURNING *
  `;

  const values = [
    start,
    destination,
    budget,
    days,
    interests,
    plan
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};