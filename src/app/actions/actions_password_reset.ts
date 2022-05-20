import { app } from 'app/config/firebase'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { actionCodeSettings } from './actions_settings'

const resetPassword = async (email: string) => {
  const auth = getAuth(app)

  return await sendPasswordResetEmail(auth, email, actionCodeSettings)
}

export default resetPassword
