import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { login } from '../../redux/auth-reducer/auth-reducer'
import { getIsLoggedIn } from '../../redux/auth-reducer/auth-selector'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'

import FormInput from '../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../common/Buttons/PrimaryButton/PrimaryButton'

export type LoginFormPayload = {
  email: string
  phone?: string
  password: string
}

const Login: FC<{}> = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  const dispatch = useAppDispatch()

  if (isLoggedIn) return <Navigate to={'/profile'} />

  const initialValues: LoginFormPayload = {
    email: '',
    password: '',
  }

  const passwordMinLength = 4
  const validationSchema = Yup.object({
    email: Yup.string().email('invalid email').required(),
    password: Yup.string()
      .required()
      .min(
        passwordMinLength,
        `Password is too short - should be ${passwordMinLength} chars minimum`,
      ),
    rememberMe: Yup.boolean().default(false),
    captcha: Yup.string().when('!captcha && captchaURL', {
      is: true,
      then: Yup.string().required('captcha is required'),
    }),
  })

  const onSubmit = (
    values: LoginFormPayload,
    { setSubmitting }: FormikHelpers<LoginFormPayload>,
  ) => {
    dispatch(login(values))
    setSubmitting(false)
  }

  return (
    <section className='h-screen relative'>
      <div className='px-6 py-12 h-full'>
        <div className='flex justify-center items-center flex-wrap h-full text-gray-700'>
          <div className='sm:w-8/12 lg:w-6/12 mb-12 sm:mb-0'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
              className='w-full'
              alt='Phone'
            />
          </div>
          <div className='sm:w-8/12 lg:w-5/12 lg:ml-20'>
            <div className='text-gray-700 font-bold text-center mb-6'>Log into InLink</div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ isSubmitting }: FormikProps<LoginFormPayload>) => (
                <Form className='text-xl'>
                  <>
                    <div className='mb-6'>
                      <FormInput
                        field={{
                          type: 'email',
                          name: 'email',
                          placeholder: 'Email address',
                          className: 'w-full px-4 py-2',
                        }}
                      />
                    </div>

                    <div className='mb-6'>
                      <FormInput
                        field={{
                          type: 'password',
                          name: 'password',
                          placeholder: 'Password',
                          className: 'w-full px-4 py-2',
                        }}
                      />
                    </div>

                    <PrimaryButton
                      type='submit'
                      className='inline-block
                                px-7 py-3 w-full text-sm'
                      disabled={isSubmitting}
                      color='blue'
                    >
                      Log in
                    </PrimaryButton>
                  </>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
