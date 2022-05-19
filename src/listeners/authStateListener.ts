import { getAuthData } from 'app/auth'
import { onAuthStateChanged, User } from 'firebase/auth'

const authStateListener = (cb: any) => {
  onAuthStateChanged(getAuthData(), (user: User | null) => cb(user))
}

export default authStateListener
