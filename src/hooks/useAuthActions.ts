import { signin, signinWithGithubPopup, signinWithGooglePopup, signout, signup } from '../app/auth'

const useAuthActions = () => {
  return {
    login: signin,
    loginWithGithubPopup: signinWithGithubPopup,
    loginWithGooglePopup: signinWithGooglePopup,
    logout: signout,
    register: signup
  }
}

export default useAuthActions
