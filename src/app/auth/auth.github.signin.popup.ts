import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'

const signinWithGithubPopup = async () => {
  const auth = getAuth()
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
