import { State } from './index'

export const addError = <T extends Error>(state: State, error: T) => {
  const errors = [...state.errors]

  const existIndex = errors?.findIndex(e => e.name === error.name)

  if (existIndex !== -1) {
    errors[existIndex] = error
    return { ...state, errors }
  }

  return { ...state, errors: [...errors, error] }
}
