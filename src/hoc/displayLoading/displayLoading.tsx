/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from 'store'

function displayLoading(element: JSX.Element): null | JSX.Element {
  const useSelector = useAppSelector
  const isLoading = useSelector(state => state.ui.loading)
  if (isLoading) return element

  return null
}

export default displayLoading
