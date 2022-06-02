import { loadState } from 'utils'

import { Action, State } from '.'
import { addError } from './ui.helpers'
import {
  SET_ERROR,
  SET_LOADING,
  SET_MODAL,
  SET_THEME,
  SWITCH_MODAL,
  SWITCH_THEME,
  UPDATE_UI
} from './ui.types'

const initialState = {
  errors: [],
  modal: {
    visible: false,
    message: ''
  },
  theme: loadState('theme') || 'light',
  loading: false
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

    case SET_MODAL:
      return { ...state, modal: action.payload }

    case SWITCH_MODAL:
      return { ...state, modal: { ...state.modal, visible: !state.modal.visible } }

    default:
      return state
  }
}

export default uiReducer
