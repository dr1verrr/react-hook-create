import { getAuth, signOut } from 'firebase/auth'
import { app } from '../config/firebase'

const signout = async () => {
  const auth = getAuth(app)

  try {
    const logout = await signOut(auth)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
    return error
  }
}

export default signout
