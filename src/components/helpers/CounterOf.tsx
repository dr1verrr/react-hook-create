type CounterOfProps = {
  value: number | string
  max: number | string
}

export default function CounterOf({ value, max }: CounterOfProps) {
  return (
    <span>
      {value}/{max}
    </span>
  )
}
