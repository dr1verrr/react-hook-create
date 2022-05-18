import signin from './auth.signin.password'
import signup from './auth.signup.password'
import signout from './auth.signout'
import signinWithGithubPopup from './auth.github.signin.popup'
import signinWithGooglePopup from './auth.google.signin.popup'
import { getAuthData } from './auth.helpers'

export { signin, signup, signout, signinWithGooglePopup, signinWithGithubPopup, getAuthData }
