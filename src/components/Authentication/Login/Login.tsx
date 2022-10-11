import { NavLink, Navigate } from 'react-router-dom'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { login } from '../../../redux/auth-reducer/auth-reducer'
import { getIsLoggedIn } from '../../../redux/auth-reducer/auth-selector'
import { getIsAppInitialized } from '../../../redux/app-reducer/app-selector'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'

import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'
import CommonAuthInput from '../CommonAuthInput/CommonAuthInput'

export type LoginFormPayload = {
  emailOrPhone: string
  password: string
}

const Login = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  const dispatch = useAppDispatch()

  if (isLoggedIn) return <Navigate to='/' />

  const initialValues: LoginFormPayload = {
    emailOrPhone: '',
    password: '',
  }

  const passwordMinLength = 4

  const validationSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .required('Email / Phone is required')
      .test('emailOrPhone', 'Email / Phone is invalid', (value) => {
        return validateEmail(value) || validatePhone(parseInt(value ?? '0'))
      }),
    password: Yup.string()
      .required()
      .min(
        passwordMinLength,
        `Password is too short - should be ${passwordMinLength} chars minimum`,
      ),
  })

  const validateEmail = (email: string | undefined) => {
    return Yup.string().email().isValidSync(email)
  }

  const validatePhone = (phone: number | undefined) => {
    return Yup.number()
      .integer()
      .positive()
      .test((phone) => {
        return phone && phone.toString().length >= 8 && phone.toString().length <= 14 ? true : false
      })
      .isValidSync(phone)
  }

  const onSubmit = (
    values: LoginFormPayload,
    { setSubmitting }: FormikHelpers<LoginFormPayload>,
  ) => {
    let payloadValues
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailOrPhone))
      payloadValues = {
        email: values.emailOrPhone,
        password: values.password,
      }
    else
      payloadValues = {
        phone: values.emailOrPhone,
        password: values.password,
      }
    dispatch(login(payloadValues))
    setSubmitting(false)
  }

  return (
    <section className='h-screen relative'>
      <div className='px-6 py-12 h-full'>
        <div className='flex justify-center items-center flex-wrap h-full text-slate-700'>
          <div className='sm:w-8/12 lg:w-5/12'>
            <div className='font-bold text-center mb-6'>Log into DoIt</div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ isSubmitting }: FormikProps<LoginFormPayload>) => (
                <Form className='text-xl'>
                  <>
                    <CommonAuthInput name='emailOrPhone' placeholder='Email or phone number' />
                    <CommonAuthInput isNameAlsoType={true} name='password' placeholder='Password' />

                    <PrimaryButton
                      type='submit'
                      className='inline-block
                                px-7 py-3 w-full text-sm
                                flex justify-center'
                      disabled={isSubmitting}
                      color='blue'
                    >
                      Log in
                    </PrimaryButton>
                    <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                      Don't have an account?
                      <NavLink
                        to='/register'
                        className='text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
                      >
                        Register
                      </NavLink>
                    </p>
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
