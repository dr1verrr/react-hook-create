import { SET_USER } from './user.types'

export const setUser = (user: object | null) => ({ type: SET_USER, payload: user })
