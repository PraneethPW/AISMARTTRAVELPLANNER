import pool from "../config/db"

export const saveTrip = async (
userId: number,
start: string,
destination: string,
budget: number,
days: number,
interests: string,
plan: any
)=>{

const result = await pool.query(
`
INSERT INTO trips
(user_id,start_location,destination,budget,days,interests,plan)
VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *
`,
[userId,start,destination,budget,days,interests,plan]
)

return result.rows[0]

}

export const getUserTrips = async (userId:number)=>{

const result = await pool.query(
"SELECT * FROM trips WHERE user_id=$1",
[userId]
)

return result.rows

}