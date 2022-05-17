import { sendEmailVerification, User } from 'firebase/auth'
import { actionCodeSettings } from './actions.settings'

const verifyEmail = async (user: User) => {
  try {
    await sendEmailVerification(user, actionCodeSettings)
    console.log('email verification link sent')
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export default verifyEmail
