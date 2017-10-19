import { handleActions } from 'redux-actions'
import {
    getLessons, getLessonsSuccess, getLessonsFailure,
} from '../actions/http'


export const lessonList = handleActions({
    [getLessons]: () => ({ payload: [], __fetchStatus: 'fetching' }),
    [getLessonsSuccess]: (state, action) => ({ payload : action.payload, __fetchStatus: 'success' }),
    [getLessonsFailure]: () => ({ payload: [], __fetchStatus: 'failure' })
}, { payload: [] })
