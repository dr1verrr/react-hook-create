import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseListener } from 'index.d'

import { getAuthData } from 'app/auth'

const authStateListener: FirebaseListener = (nextOrObserver, error, completed) => {
  const auth = getAuthData()
  return onAuthStateChanged(auth, nextOrObserver, error, completed)
}

export default authStateListener
