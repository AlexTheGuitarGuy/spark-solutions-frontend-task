import { AxiosError } from 'axios'

import { securityAPI, LoginResponse } from '../../api/API'

import { InferAction, InferThunk } from '../store'
import { setAlertFromThunk } from '../app-reducer/app-reducer'
import { RegisterFormPayload } from '../../components/Authentication/Register/Register'

const initialState = {
  token: '',
  user: {
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
  },
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

type SetDataPayload = LoginResponse & {
  isLoggedIn: boolean
}

const authActions = {
  setData: (data: SetDataPayload) =>
    ({
      type: 'IN_LINK/AUTH_REDUCER/SET_DATA',
      payload: { ...data },
    } as const),
}

export type ValidLoginPayload = {
  email?: string
  phone?: string
  password: string
}
export const login = (payload: ValidLoginPayload): AuthThunk => {
  return async (dispatch) => {
    let response
    try {
      response = await securityAPI.login(payload)
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || 'An error has occurred'
        dispatch(setAlertFromThunk({ message, type: 'error' }))
        return
      }
      console.log('Error at auth reducer inside login thunk:', error)
    }

    dispatch(authActions.setData({ ...response, isLoggedIn: true }))
    dispatch(setAlertFromThunk({ message: 'logged in', type: 'success' }))
  }
}

export const register = (payload: RegisterFormPayload): AuthThunk => {
  return async (dispatch) => {
    let response
    try {
      response = await securityAPI.register(payload)
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message || 'An error has occurred'
        dispatch(setAlertFromThunk({ message, type: 'error' }))
        return
      }
      console.log('Error at auth reducer inside register thunk:', error)
    }

    dispatch(
      setAlertFromThunk({
        message: response?.message || 'Successfully registered',
        type: 'success',
      }),
    )
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
