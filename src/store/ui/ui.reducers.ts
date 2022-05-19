import { UPDATE_UI } from './ui.types'

export interface UIPayload {
  errors?: object
  modal?: {
    message: string
    visible: boolean
  }
}

type ReducerActionType = {
  type: string
  payload: UIPayload
}

const initialState = {
  errors: {},
  modal: {
    visible: false,
    message: '',
  },
}

const uiReducer = (state = initialState, action: ReducerActionType) => {
  switch (action.type) {
    case UPDATE_UI:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default uiReducer
