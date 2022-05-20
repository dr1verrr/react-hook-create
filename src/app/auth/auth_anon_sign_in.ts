import { getAuth, signInAnonymously } from 'firebase/auth'
import { app } from '../config/firebase'

const signAsGuest = async () => {
  const auth = getAuth(app)

  return await signInAnonymously(auth)
}

export default signAsGuest
