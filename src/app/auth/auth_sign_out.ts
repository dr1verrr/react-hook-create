import { getAuth, signOut } from 'firebase/auth'
import { app } from '../config/firebase'

const signout = async () => {
  const auth = getAuth(app)

  return await signOut(auth)
}

export default signout
