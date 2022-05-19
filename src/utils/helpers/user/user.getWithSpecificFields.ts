import { User } from 'firebase/auth'

const getWithSpecificFields = (user: User) => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  photoURL: user.photoURL,
  isAnonymous: user.isAnonymous,
})

export default getWithSpecificFields
