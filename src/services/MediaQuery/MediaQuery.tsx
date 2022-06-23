import { useMediaQuery } from '@mui/material'

type MediaQueryProps = {
  query: string
  children: JSX.Element
}

function MediaQuery({ query, children }: MediaQueryProps): JSX.Element | null {
  const matches = useMediaQuery(query)
  if (matches) return children

  return null
}

export default MediaQuery
