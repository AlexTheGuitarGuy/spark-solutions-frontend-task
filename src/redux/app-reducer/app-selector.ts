import { RootState } from '../store'

export const getAlert = (state: RootState) => {
  return state.app.alert
}

export const getIsAppInitialized = (state: RootState) => {
  return state.app.isAppInitialized
}
