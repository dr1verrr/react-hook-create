import { State } from '.'
import {
  SET_ERROR,
  SET_LOADING,
  SET_MODAL,
  SET_THEME,
  SWITCH_MODAL,
  SWITCH_THEME,
  UPDATE_UI
} from './ui.types'

export const updateUI = (payload: State) => ({ type: UPDATE_UI, payload })
export const setLoading = (payload: boolean) => ({
  type: SET_LOADING,
  payload
})
export const setError = (payload: object) => ({ type: SET_ERROR, payload })
export const setTheme = (payload: string) => ({ type: SET_THEME, payload })
export const switchTheme = () => ({ type: SWITCH_THEME })
export const setModal = (options: { message?: string; visible?: boolean }) => ({
  type: SET_MODAL,
  payload: options
})
export const switchModal = () => ({ type: SWITCH_MODAL })
