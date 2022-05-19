import { UIPayload } from './ui.reducers'
import { UPDATE_UI } from './ui.types'

export const updateUI = (payload: UIPayload) => ({ type: UPDATE_UI, payload })
