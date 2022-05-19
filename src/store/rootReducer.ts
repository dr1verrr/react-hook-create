import { combineReducers } from 'redux'
import uiReducer from './ui/ui.reducers'
import userReducer from './user/user.reducers'

const rootReducer = combineReducers({ ui: uiReducer, user: userReducer })

export default rootReducer
