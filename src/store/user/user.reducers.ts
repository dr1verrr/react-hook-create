import { User } from 'firebase/auth'
import { SET_USER } from './user.types'

type ReducerActionType = {
  type: string
  payload: User | null
}

interface IState {
  authenticated: boolean
  data: User | null
}

const initialState: IState = { authenticated: false, data: null }

const userReducer = (state = initialState, action: ReducerActionType) => {
  switch (action.type) {
    case SET_USER:
      return { authenticated: Boolean(action.payload), data: action.payload }

    default:
      return state
  }
}

export default userReducer
