import API from "./api"

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = LoginPayload & {
  name: string
}

export const loginUser = (data: LoginPayload) => {
  return API.post("/auth/login",data)
}

export const registerUser = (data: RegisterPayload) => {
  return API.post("/auth/register",data)
}
