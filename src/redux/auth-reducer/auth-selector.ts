import { RootState } from '../store'

export const getIsLoggedIn = (state: RootState) => {
  return state.auth.isLoggedIn
}
