import * as commonReducers from './common'
import * as httpReducers from './http'

export default {
    ...commonReducers,
    ...httpReducers
}
