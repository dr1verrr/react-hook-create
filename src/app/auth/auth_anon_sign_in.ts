import { getAuth, signInAnonymously } from 'firebase/auth'
import { app } from '../config/firebase'

const signAsGuest = async () => {
  const auth = getAuth(app)

  try {
    await signInAnonymously(auth)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
    return error
  }
}

export default signAsGuest
