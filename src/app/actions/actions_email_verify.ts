import { sendEmailVerification, User } from 'firebase/auth'

const verifyEmail = async (user: User) => {
  console.log('verify email user', user)

  return await sendEmailVerification(user)
}

export default verifyEmail
