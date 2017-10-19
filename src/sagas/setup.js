import { delay} from 'redux-saga'
import { takeLatest, put, fork, take, race } from 'redux-saga/effects'
import {
    appStart,
} from '../actions/common'
import {
    getLessons, getLessonsSuccess, getLessonsFailure
} from '../actions/http'
//初始化
function* setup() {
    yield takeLatest(appStart.toString(), function* () {
        yield put(getLessons({ time: Date.now() })) 
        const { succ, fail } = yield race({
            orgs: take(getLessonsSuccess.toString()), 
            fail: take(getLessonsFailure.toString())
        })

        if (succ) {
            // doSth
            console.warn('getLessons 成功')
        }
        if (fail) {
            // doSth
            yield delay(1000)
            console.warn('getLessons 失败')
        }
    });
}


export default fork(setup)
