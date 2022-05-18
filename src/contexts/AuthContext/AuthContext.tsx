import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { getAuthData } from '../../app/auth'

export type AuthContextType = {
  user: User
  isAuthenticated: boolean
}

const AuthContext = createContext({})
const useAuth = () => useContext(AuthContext) as AuthContextType

type AuthProviderPropTypes = {
  children: ReactNode
}

const AuthProvider: FC<AuthProviderPropTypes> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(getAuthData(), user => setUser(user))
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
