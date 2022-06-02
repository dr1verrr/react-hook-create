import { loadState } from 'utils'

import { Action, State } from '.'
import { SET_AUTH } from './auth.types'

const initialState = loadState('auth') || false

const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.payload

    default:
      return state
  }
}

export default authReducer
