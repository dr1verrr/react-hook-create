import { toast } from 'react-toastify'

import { store } from 'store'
import { setError, setLoading } from 'store/ui/ui.actions'
import { convertMessage } from 'utils'

const errorHandler = async (cb: () => any, onSuccess?: () => any) => {
  store.dispatch(setLoading(true))

  try {
    await cb()
    if (onSuccess) onSuccess()
  } catch (error: any) {
    const message = convertMessage(error.message)

    toast(message, { type: 'error' })
    store.dispatch(setError({ code: error.code, message, name: error.name }))
  } finally {
    store.dispatch(setLoading(false))
  }
}

export default errorHandler
