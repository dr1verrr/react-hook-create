import { SET_AUTH } from './auth.types'

export const setAuth = <T>(isAuthenticated: T) => ({ type: SET_AUTH, payload: isAuthenticated })
