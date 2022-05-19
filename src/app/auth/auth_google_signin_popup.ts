import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from '../config/firebase'

const signinWithGooglePopup = async () => {
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()

  try {
    await signInWithPopup(auth, googleProvider)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
    return error
  }
}

export default signinWithGooglePopup
