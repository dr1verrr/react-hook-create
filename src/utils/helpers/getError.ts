import { get } from 'lodash'

const getError = (errors: object, fieldName: string) => {
  const error = get(errors, fieldName)

  return error
}

export default getError
