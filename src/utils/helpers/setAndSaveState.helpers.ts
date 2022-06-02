import { saveState } from './localStorage.helpers'

const setAndSaveState = <D extends Function, A, LSV>(
  dispatch: D,
  actionOrState: A,
  localStorage: {
    key: string
    value: LSV
  }
): void => {
  const { key, value } = localStorage
  dispatch(actionOrState)
  saveState(key, value)
}

export default setAndSaveState
