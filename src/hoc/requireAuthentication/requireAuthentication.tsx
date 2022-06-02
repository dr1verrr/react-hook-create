/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from 'store'

function requireAuthentication(
  element: JSX.Element | null,
  alternativeEl?: JSX.Element
): null | JSX.Element {
  const useSelector = useAppSelector
  const isAuthenticated = useSelector(state => state.auth)

  if (!!element && isAuthenticated) return element
  if (!!alternativeEl) return alternativeEl
  return null
}

export default requireAuthentication
