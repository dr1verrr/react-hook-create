import { Auth, getAuth } from 'firebase/auth'
import { app } from '../config/firebase'

export const getAuthData = (): Auth => getAuth(app)
