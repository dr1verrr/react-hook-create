import { store } from 'store'
import { setError, setLoading } from 'store/ui/ui.actions'
import { toast } from 'react-toastify'

const errorHandler = async (cb: () => any) => {
  store.dispatch(setLoading(true))

  try {
    return await cb()
  } catch (error: any) {
    toast(error.code, { type: 'error' })
    store.dispatch(setError({ ...error }))
  } finally {
    store.dispatch(setLoading(false))
  }
}

export default errorHandler
