import { identity } from 'ramda'
import { deepFreeze } from '../helpers/ReduxHelpers'

// the transform interface that redux-persist is expecting
export default {
	out: deepFreeze,
	in: identity
}
