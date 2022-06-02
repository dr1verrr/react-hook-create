import { CompleteFn, ErrorFn, NextOrObserver, User } from 'firebase/auth'

declare type FirebaseListener = (
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn,
  completed?: CompleteFn
) => any

export { FirebaseListener }
