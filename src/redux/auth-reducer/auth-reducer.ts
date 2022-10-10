import { securityAPI, UserData } from '../../api/API'
import { LoginFormPayload } from '../../components/Login/Login'

import { InferAction, InferThunk } from '../store'
import { setAlertFromThunk } from '../app-reducer/app-reducer'

const initialState = {
  id: 0,
  uuid: '',
  avatar: '' as null | string,
  firstname: '' as null | string,
  lastname: '' as null | string,
  email: '',
  phone: '' as null | string,
  lang: '',
  provider: '' as null | string,
  description: '' as null | string,
  birthDate: '' as null | string,
  courierRating: 0,
  ownerRating: 0,
  countryId: 0 as null | number,
  cityId: 0 as null | number,
  isPhoneConfirmed: false,
  isEmailConfirmed: false,
  isExecutor: false,
  notificationEnabled: false,
  emailsEnabled: false,
  createdAt: '',
  updatedAt: '',
  fullname: '' as null | string,
  country: '' as null | string,
  city: '' as null | string,
  isLoggedIn: false,
}

export type AuthReducerState = typeof initialState

type AuthAction = InferAction<typeof authActions>

type AuthThunk = InferThunk<AuthAction>

const authReducer = (state = initialState, action: AuthAction): AuthReducerState => {
  switch (action.type) {
    case 'IN_LINK/AUTH_REDUCER/SET_DATA':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

type SetDataPayload = UserData & {
  isLoggedIn: boolean
}

const authActions = {
  setData: (data: SetDataPayload) =>
    ({
      type: 'IN_LINK/AUTH_REDUCER/SET_DATA',
      payload: { ...data },
    } as const),
}

export const auth = (): AuthThunk => {
  return async (dispatch) => {
    /*    const data = await securityAPI.me()
    if (data.resultCode === ResultCodes.Success) {
      dispatch(authActions.setData({ ...data.data, isLoggedIn: true }))
    }*/
  }
}

export const login = (payload: LoginFormPayload): AuthThunk => {
  return async (dispatch) => {
    console.log(payload)

    const data = await securityAPI.login(payload)

    console.log(data)

    /*    if (!data?.message) {
      dispatch(auth())
      dispatch(setAlertFromThunk({ message: 'logged in', type: 'success' }))
    } else {
      const message = data.message || 'An error has occurred'
      dispatch(setAlertFromThunk({ message, type: 'error' }))
    }*/
  }
}
/*
export const logout = (): AuthThunk => {
  return async (dispatch) => {
    const data = await securityAPI.logout()

    if (data.resultCode === ResultCodes.Success) {
      dispatch(authActions.setData({ id: 0, login: '', email: '', isLoggedIn: false }))
      dispatch(authActions.setCaptcha(''))
      dispatch(setAlertFromThunk({ message: 'logged out', type: 'alert' }))
    } else {
      dispatch(setAlertFromThunk({ message: "couldn't log out", type: 'error' }))
    }
  }
}
*/
export default authReducer
