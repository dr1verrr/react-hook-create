import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const signup = async (email: string, password: string) => {
  const auth = getAuth()

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log(user)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
    return error
  }
}

export default signup
