import { RootState } from '../store'

export const getIsAppInitialized = (state: RootState) => {
  return state.app.isAppInitialized
}

export const getAlert = (state: RootState) => {
  return state.app.alert
}
