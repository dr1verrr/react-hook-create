import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const signinWithGooglePopup = async () => {
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()

  try {
    await signInWithPopup(auth, googleProvider)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export default signinWithGooglePopup
