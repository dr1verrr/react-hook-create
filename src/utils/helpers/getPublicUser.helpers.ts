import { User } from 'firebase/auth'
import { isEmpty, pickBy } from 'lodash'

const getPublicUser = <T extends User | null>(user: T): Partial<T> | null => {
  const publicFields = ['email', 'displayName', 'emailVerified', 'isAnonymous', 'photoURL']
  const data = pickBy(user, (value, key) => publicFields.includes(key))

  return isEmpty(user) ? null : data
}

export default getPublicUser
