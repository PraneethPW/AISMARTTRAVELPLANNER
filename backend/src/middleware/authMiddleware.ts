import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/env"

export const authMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    })
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = jwt.verify(
      token,
      env.jwtSecret
    )

    req.user = decoded

    next()

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })

  }

}
