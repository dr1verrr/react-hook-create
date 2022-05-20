import { store } from 'store'
import { updateUI } from 'store/ui/ui.actions'
import { toast } from 'react-toastify'

const errorHandler = async (cb: Function) => {
  try {
    return await cb()
  } catch (error: any) {
    toast(error.message, { type: 'error' })
    store.dispatch(
      updateUI({
        errors: { ...error },
      })
    )
  }
}

export default errorHandler
