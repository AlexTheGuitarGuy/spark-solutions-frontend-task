import withAuthRedirect from '../../HOC/withAuthRedirect'
import { compose } from 'redux'

const Home = () => {
	return <div>home</div>
}

export default compose(withAuthRedirect)(Home)
