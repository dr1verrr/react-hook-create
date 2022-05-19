import signin from './auth_signin_password'
import signup from './auth_signup_password'
import signout from './auth_sign_out'
import signinWithGithubPopup from './auth_github_signin_popup'
import signinWithGooglePopup from './auth_google_signin_popup'
import { getAuthData } from './auth_helpers'
import signAsGuest from './auth_anon_sign_in'

export {
  signin,
  signup,
  signout,
  signinWithGooglePopup,
  signinWithGithubPopup,
  getAuthData,
  signAsGuest,
}
