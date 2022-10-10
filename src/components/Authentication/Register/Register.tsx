import { Navigate } from 'react-router-dom'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'

import { register } from '../../../redux/auth-reducer/auth-reducer'
import { getIsLoggedIn } from '../../../redux/auth-reducer/auth-selector'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'

import FormInput from '../../common/Inputs/FormInput/FormInput'
import PrimaryButton from '../../common/Buttons/PrimaryButton/PrimaryButton'
import CommonAuthInput from '../CommonAuthInput/CommonAuthInput'

export type RegisterFormPayload = {
	email: string
	password: string
	firstname: string | null
	lastname: string | null
	description: string | null
	birthDate: string | null
	phone: string | null
}

const Register = () => {
	const isLoggedIn = useAppSelector(getIsLoggedIn)

	const dispatch = useAppDispatch()

	if (isLoggedIn) return <Navigate to='/' />

	const initialValues: RegisterFormPayload = {
		email: '',
		password: '',
		firstname: '',
		lastname: '',
		description: '',
		birthDate: '',
		phone: '',
	}

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
	const validationSchema = Yup.object().shape({
		email: Yup.string().required(),
		password: Yup.string().required(),
		phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
		birthDate: Yup.date(),
	})

	const onSubmit = (
		{ email, password, firstname, lastname, description, birthDate, phone }: RegisterFormPayload,
		{ setSubmitting }: FormikHelpers<RegisterFormPayload>,
	) => {
		const payloadValues = {
			email,
			password,
			firstname: firstname || null,
			lastname: lastname || null,
			description: description || null,
			birthDate: birthDate || null,
			phone: phone || null,
		}
		dispatch(register(payloadValues))
		setSubmitting(false)
	}

	return (
		<section className='h-screen relative'>
			<div className='px-6 py-12 h-full'>
				<div className='flex justify-center items-center flex-wrap h-full text-slate-700'>
					<div className='w-8/12 lg:w-full'>
						<div className='font-bold text-center mb-6'>Registration</div>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
							enableReinitialize
						>
							{({ isSubmitting }: FormikProps<RegisterFormPayload>) => (
								<Form className='text-xl'>
									<>
										<div className='lg:grid lg:grid-cols-2'>
											<div className='lg:mr-4'>
												<CommonAuthInput name='firstName' placeholder='First Name' />
												<CommonAuthInput name='lastname' placeholder='Last Name' />
												<CommonAuthInput isNameAlsoType={true} name='email' placeholder='Email' />
												<CommonAuthInput
													isNameAlsoType={true}
													name='password'
													placeholder='Password'
												/>
											</div>
											<div className='lg:ml-4 flex flex-col justify-between'>
												<CommonAuthInput name='phone' placeholder='Phone' />

												<FormInput
													className='mb-6'
													label={{ text: 'Date of birth' }}
													field={{
														name: 'birthDate',
														placeholder: 'dd/mm/yyyy',
														className: 'w-full px-4 py-2',
													}}
												/>

												<FormInput
													className='mb-4'
													field={{
														name: 'description',
														placeholder: 'Description',
														className: 'w-full px-4 py-2 resize-none',
														as: 'textarea',
													}}
												/>
											</div>
										</div>
										<div className='flex justify-center'>
											<PrimaryButton
												type='submit'
												className='inline-block
                                						px-7 py-3 text-sm
                                						lg:w-1/2 w-full 
                                						flex justify-center'
												disabled={isSubmitting}
												color='blue'
											>
												Register
											</PrimaryButton>
										</div>
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

export default Register
