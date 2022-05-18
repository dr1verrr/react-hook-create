import { User } from 'firebase/auth'
import { SET_USER } from './types'

type ReducerStateType = object | null | User
type ReducerActionType = {
  type: string
  payload: User | null
}

export const rootReducer = (state: ReducerStateType = {}, action: ReducerActionType) => {
  switch (action.type) {
    case SET_USER:
      return action.payload

    default:
      return state
  }
}
