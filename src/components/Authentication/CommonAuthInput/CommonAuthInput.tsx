import FormInput from '../../common/Inputs/FormInput/FormInput'
import { FC } from 'react'

type CommonAuthInputProps = {
	isNameAlsoType?: boolean
	name: string
	placeholder: string
}

const CommonAuthInput: FC<CommonAuthInputProps> = ({ isNameAlsoType, name, placeholder }) => {
	return (
		<FormInput
			className='mb-6'
			field={{
				type: isNameAlsoType ? name : undefined,
				name,
				placeholder,
				className: 'w-full px-4 py-2',
			}}
		/>
	)
}

export default CommonAuthInput
