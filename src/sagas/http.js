import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { toggleLoading } from '../actions/common'
import * as httpActions from '../actions/http'
import { toast } from '../utils'
import request from '../utils/api'
// import { isDebug } from '../constants'
const isDebug = false

const forks = []
/**
 * import 所有http的actions，并take它们，完成发请求／并依据结果dispatch 成功/失败方法
 * 使用saga设置http成功失败回调的例子
 * yield takeLastest(httpAction.toString(), function*(){
 *     const { succ, fail } = yield race({
 *          succ : take(httpActionSuccess.toString()), 
 *          fail : take(httpActionFailure.toString())
 *      })
 *      if(succ){
 *          //成功
 *      }
 *      if(fail){
 *          //失败
 *      }
 * })
 */
Object.values(httpActions).forEach((actionsCreator) => {
    if (actionsCreator.success && actionsCreator.failure) {
        forks.push(function* () {
            //takeEvery
            yield takeEvery(actionsCreator.toString(), function* (action) {
                const { ingoreToast, callback } = action.payload
                try {
                    yield put(toggleLoading(true))
                    const result = yield call(request, action.payload)
                    isDebug && console.log(`%c 请求成功 ${actionsCreator.toString()}`, 'background: green; color: white', { result, fetch: action.payload })
                    yield put(actionsCreator.success(result))
                    yield call(callback, true, result)
                } catch (ex) {
                    isDebug && console.warn(`%c 请求失败 ${actionsCreator.toString()}`, 'background: red; color: white', { result: ex, fetch: action.payload })
                    yield put(actionsCreator.failure(ex))
                    yield call(callback, false, ex)
                    if (!ingoreToast) {
                        yield call(toast, { type: 'error', text: ex.errorMsg || ex.userMessage || ex.message || '系统繁忙，请重试' })
                    }
                    if (ex.status == 401) {
                        //alert(ex.userMessage || '未登录')
                    }
                }
                yield put(toggleLoading(false))
            });
        })
    }
})

export default all(forks.map(v => fork(v)))
