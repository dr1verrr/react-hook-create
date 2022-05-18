import { SET_USER } from './types'

interface User {
  displayName: string | null | undefined
  email: string | null | undefined
  emailVerified: boolean | null | undefined
  photoURL: string | null | undefined
}

export const setUser = (user: User | null) => ({ type: SET_USER, payload: user })
