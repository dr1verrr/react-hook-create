import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { actionCodeSettings } from './actions.settings'

const resetPassword = async (email: string) => {
  const auth = getAuth()

  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
    console.log('reset password link sent to email')
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export default resetPassword
