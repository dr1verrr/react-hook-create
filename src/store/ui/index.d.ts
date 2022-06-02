import { PaletteMode } from '@mui/material'

type State = {
  errors: Error[]
  modal: {
    message: string
    visible: boolean
  }
  loading: boolean
  theme: PaletteMode
}

type Action = {
  type: string
  payload: any
}

export { Action, State }
