import { State } from '.'
import {
  SET_ERROR,
  SET_LOADING,
  SET_THEME,
  SWITCH_THEME,
  TOGGLE_SIDEBAR,
  UPDATE_UI
} from './ui.types'

const updateUI = (payload: State) => ({ type: UPDATE_UI, payload })
const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload
})
const setError = (payload: object) => ({ type: SET_ERROR, payload })
const setTheme = (payload: string) => ({ type: SET_THEME, payload })
const switchTheme = () => ({ type: SWITCH_THEME })

const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR })

export { updateUI, setLoading, setError, setTheme, switchTheme, toggleSidebar }
