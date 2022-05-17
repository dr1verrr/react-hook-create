import { getAuth, signOut } from 'firebase/auth'

const signout = async () => {
  const auth = getAuth()

  try {
    await signOut(auth)
    console.log('logout')
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export default signout
