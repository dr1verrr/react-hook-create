import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from '../config/firebase'

const signinWithGooglePopup = async () => {
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()

  return await signInWithPopup(auth, googleProvider)
}

export default signinWithGooglePopup
