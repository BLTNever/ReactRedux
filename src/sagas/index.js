import setup from './setup'
import http from './http'
/**
 * rootSaga
 */
export default function* root() {
  yield http
  yield setup
}
