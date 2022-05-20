import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../config/firebase'

const signinWithGithubPopup = async () => {
  const auth = getAuth(app)
  const githubProvider = new GithubAuthProvider()

  return await signInWithPopup(auth, githubProvider)
}

export default signinWithGithubPopup
