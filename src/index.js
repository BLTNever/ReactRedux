
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux"
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import store from './configureStore'
import routes from './routes'
import { polyfill } from 'es6-promise'
polyfill()

const history = syncHistoryWithStore(hashHistory, store)
const $dingapp = document.getElementById('dingapp')
render(
    <Provider store={store}>
        <Router history={history} routes={routes(store)} />
    </Provider>,
    $dingapp);