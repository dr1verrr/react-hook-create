import { store } from 'store'
import { updateUI } from 'store/ui/ui.actions'
import { toast } from 'react-toastify'

const errorHandler = (cb: Function) => {
  const result: any = cb()

  result.then((res: any) => {
    if (res instanceof Error) {
      toast(res.message)
      store.dispatch(
        updateUI({
          errors: { ...res },
        })
      )
    }
  })
}

export default errorHandler
