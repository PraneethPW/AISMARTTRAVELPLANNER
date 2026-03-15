import { Request,Response } from "express"
import { createUser,findUserByEmail } from "../models/userModel"
import { hashPassword,comparePassword } from "../utils/password"
import { generateToken } from "../utils/jwt"

export const register = async(req:Request,res:Response)=>{

const {name,email,password} = req.body

const hashed = await hashPassword(password)

const user = await createUser(
name,
email,
hashed
)

const token = generateToken(user)

res.json({
user,
token
})

}

export const login = async(req:Request,res:Response)=>{

const {email,password} = req.body

const user = await findUserByEmail(email)

if(!user){
return res.status(400).json({message:"User not found"})
}

const valid = await comparePassword(
password,
user.password
)

if(!valid){
return res.status(401).json({message:"Invalid password"})
}

const token = generateToken(user)

res.json({
user,
token
})

}