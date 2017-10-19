import { applyMiddleware, createStore, combineReducers } from 'redux';
import { hashHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import rootSagas from './sagas';
import rootReducer from './reducers';
import { isDebug } from './constants';
const reducer = combineReducers({ ...rootReducer, routing: routerReducer });
const sagaMiddleware = createSagaMiddleware();
const configureStore = (initialState = {}) => {
    const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, routerMiddleware(hashHistory))(createStore);
    const store = createStoreWithMiddleware(reducer, initialState, (isDebug && window.__REDUX_DEVTOOLS_EXTENSION__) ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
    sagaMiddleware.run(rootSagas);
    return store;
}
export default configureStore()