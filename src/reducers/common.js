import { handleActions } from 'redux-actions'
import {
    toggleLoading,
} from '../actions/common'
import { enableActionLog } from '../constants'

export const loading = handleActions({
    [toggleLoading]: (state, action) => action.payload
}, true)

export const demo = (state = 'demo', action) => {
    enableActionLog && console.log(`%cactionType: "${action.type}"`, 'color: #666')
    enableActionLog && console.log('action: ',{ action })
    return state
}