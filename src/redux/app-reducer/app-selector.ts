import { RootState } from '../store'

export const getAlert = (state: RootState) => {
  return state.app.alert
}
