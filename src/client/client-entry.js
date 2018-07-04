import '~less/base.less'
import '~utils/logger'
import 'babel-polyfill'
import React from 'react'
import PropTypes from 'prop-types'
import { hydrate,render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './pages/routes'
import { Provider } from 'react-redux'
import configureStore from './redux/store'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

const App = ({routes})=>{
    return (
        <Provider store={store}>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>
    )
}
App.propTypes = {routes: PropTypes.array.isRequired}

hydrate(<App routes={routes}/>, document.getElementById('root'))

if(process.env.NODE_ENV === 'development'){
    if(module.hot){
        module.hot.accept(['./pages/routes'], function() {
            const newRoutes = require('./pages/routes').default
            render(<App routes={newRoutes}/>, document.getElementById('root'))
        })
    }
}

