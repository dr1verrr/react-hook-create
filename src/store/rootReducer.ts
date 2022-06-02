import { combineReducers } from 'redux'

import authReducer from './auth/auth.reducers'
import uiReducer from './ui/ui.reducers'

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer
})

export default rootReducer
