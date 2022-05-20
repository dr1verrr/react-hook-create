import { app } from 'app/config/firebase'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const signin = async (email: string, password: string) => {
  const auth = getAuth(app)

  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  console.log(user)

  return user
}

export default signin
