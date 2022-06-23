import { loadState } from 'utils'

import { Action, State } from '.'
import { addError } from './ui.helpers'
import {
  SET_ERROR,
  SET_LOADING,
  SET_THEME,
  SWITCH_THEME,
  TOGGLE_SIDEBAR,
  UPDATE_UI
} from './ui.types'

const initialState = {
  errors: [],
  theme: loadState('theme') || 'light',
  loading: false,
  sidebar: false
}

const uiReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_UI:
      return { ...state, ...action.payload }

    case SET_LOADING:
      return { ...state, loading: action.payload }

    case SET_ERROR:
      return addError(state, action.payload)

    case SET_THEME:
      return { ...state, theme: action.payload }

    case SWITCH_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }

    case TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar }

    default:
      return state
  }
}

export default uiReducer
