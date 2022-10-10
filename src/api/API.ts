import * as axios from 'axios'
import { LoginFormPayload } from '../components/Login/Login'

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export const instance = axios.default.create({
  baseURL: 'https://doit.reigncode.dev/',
})

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjYsImlhdCI6MTY2NTQwMDQwMSwiZXhwIjoxNjczMTc2NDAxfQ.yrAsWRLk0e9FggidGuPDqy6ZcMx1ivFZ5CwwvETjAWw'

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

export type LoginSuccess = {
  token: string
  user: UserData
}

export type LoginRespone = LoginError | LoginSuccess

export const securityAPI = {
  login: async (loginPayload: LoginFormPayload) => {
    const response = await instance.post<LoginRespone>(`auth/login`, {
      ...loginPayload,
      fcm_token: token,
    })

    return response.data
  },
}
