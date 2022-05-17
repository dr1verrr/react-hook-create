export const rootReducer = (initialState = {}, action: ReducerAction) => {}

export interface ReducerAction {
  type: string
  payload: object
}
