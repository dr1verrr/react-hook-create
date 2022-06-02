type Payload = boolean

type Action = {
  type: string
  payload: Payload
}

type State = boolean

export { Payload, Action, State }
