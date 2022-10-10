import * as axios from 'axios'
import { ValidLoginPayload } from '../redux/auth-reducer/auth-reducer'

import { RegisterFormPayload } from '../components/Authentication/Register/Register'

export const instance = axios.default.create({
  baseURL: 'https://doit.reigncode.dev/',
})

export type LoginError = { message: string }

export type UserData = {
  id: number
  uuid: string
  avatar: null | string
  firstname: null | string
  lastname: null | string
  email: string
  phone: null | string
  lang: string
  provider: null | string
  description: null | string
  birthDate: null | string
  courierRating: number
  ownerRating: number
  countryId: null | number
  cityId: null | number
  isPhoneConfirmed: false
  isEmailConfirmed: false
  isExecutor: true
  notificationEnabled: true
  emailsEnabled: true
  createdAt: string
  updatedAt: string
  fullname: null | string
  country: null | string
  city: null | string
}

export type LoginResponse = {
  token?: string
  user?: UserData
  message?: string
}

export type RegisterResponse = {
  message: string
  token?: string
}

export const securityAPI = {
  login: async (payload: ValidLoginPayload) => {
    const response = await instance.post<LoginResponse>(`auth/login`, {
      ...payload,
      fcm_token: 'sadsadas',
    })

    return response.data
  },
  register: async (payload: RegisterFormPayload) => {
    const response = await instance.post<RegisterResponse>(`auth/register`, payload)

    return response.data
  },
}
