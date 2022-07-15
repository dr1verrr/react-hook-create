import { useEffect, useRef, useState } from 'react'

export default function useDebounce(value: any, delay: number) {
  const handler = useRef<ReturnType<typeof setTimeout>>()
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    handler.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler.current)
    }
  }, [value, delay])

  return debouncedValue
}
