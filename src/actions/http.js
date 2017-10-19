import { createAction } from 'redux-actions';
import { isDebug } from '../constants'
const serverAddr = isDebug ? `//${location.hostname}:8989` : ''
const __actionTypes = {}
const createHttpActions = ( actionsName, endpoint, { ingoreToast, ingoreLoading } = {}, fetchOptions ={} ) => {
    if(__actionTypes[actionsName]){
        throw new Error(`${actionsName} 名字重复啦`)
    }
    __actionTypes[actionsName] = actionsName
    const action = createAction(actionsName, (body = {}, callback = ()=>{}) => { 
            return {
                endpoint : serverAddr + (typeof endpoint == 'function'  ? endpoint(body) : endpoint),
                body,
                fetchOptions,
                ingoreToast,
                ingoreLoading,
                callback
            }
    })
    action.success = createAction(`${actionsName}Success`)
    action.failure = createAction(`${actionsName}Failure`)
    __actionTypes[action.success] = action.success.toString()
    __actionTypes[action.failure] = action.failure.toString()
    return {
        [action] : action,
        [action.success] : action.success,
        [action.failure] : action.failure
    }
}


export {  __actionTypes as httpActionTypes }
// export const {
//     delUserById,
//     delUserByIdSuccess,
//     delUserByIdFailure
//  } = createHttpActions('delUserById', ({ id })=>`/v1/admin/user/${id}`)
//使用方式
// this.props.actions.delUserById({ id : 1 }, { methond : 'DELETE' })

// /v1/getLessons
 export const {
    getLessons,
    getLessonsSuccess,
    getLessonsFailure
 } = createHttpActions('getLessons', `/v1/getLessons`)
