import jwt from "jsonwebtoken"
import type { SignOptions } from "jsonwebtoken"
import { env } from "../config/env"

export const generateToken = (user: any) => {

return jwt.sign(
{
id: user.id,
role: user.role
},
env.jwtSecret,
{
expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
}
)

}
