import React from 'react'
import { Route, IndexRedirect, Redirect } from 'react-router'

import App from './containers/App'
import Main from './containers/Main'

const routers = () => (
    <Route path="/" component={App}>
        <IndexRedirect to="/menu" />
        <Route path="/menu" component={Main} />
    </Route>
)
export default routers