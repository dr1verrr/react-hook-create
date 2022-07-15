import { useWatch } from 'react-hook-form'

type FieldValues = Record<string, any>

type WatchProps = {
  name: string
  render?: (value: FieldValues) => any
}

export default function Watch({ name, render }: WatchProps) {
  const value = useWatch({ name })

  if (render) {
    return render(value)
  }

  return value
}
