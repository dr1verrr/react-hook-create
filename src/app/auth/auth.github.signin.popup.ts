import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../config/firebase'

const signinWithGithubPopup = async () => {
  const auth = getAuth(app)
  const githubProvider = new GithubAuthProvider()

  try {
    await signInWithPopup(auth, githubProvider)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export default signinWithGithubPopup
