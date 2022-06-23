import { PaletteMode } from '@mui/material'

type State = {
  errors: Error[]
  loading: boolean
  theme: PaletteMode
  sidebar: boolean
}

type Action = {
  type: string
  payload: any
}

export { Action, State }
