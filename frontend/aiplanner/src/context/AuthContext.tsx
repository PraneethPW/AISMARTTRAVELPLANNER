/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"
import type { ReactNode } from "react"

type User = {
  id?: string | number
  name?: string
  email?: string
}

type LoginData = {
  token: string
  user: User
}

type AuthContextValue = {
  user: User | null
  login: (data: LoginData) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (data: LoginData) => {
    localStorage.setItem("token", data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
