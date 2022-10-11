import withAuthRedirect from '../../HOC/withAuthRedirect'
import { compose } from 'redux'
import PrimaryButton from '../common/Buttons/PrimaryButton/PrimaryButton'

const Home = () => {
	return (
		<div>
			<div>home</div>
			<PrimaryButton className='py-2 px-4' color='blue' onClick={() => {}}>
				Log out
			</PrimaryButton>
		</div>
	)
}

export default compose(withAuthRedirect)(Home)
