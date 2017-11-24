import 'regenerator-runtime/runtime'
import Inferno from 'inferno'
import { Router } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import {
  Provider
} from 'inferno-redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from '../reducers'
import rootSaga from '../sagas'
import routes from './routes'

if (process.env.NODE_ENV !== 'production') {
  require('inferno-devtools')
} else {
  require('./sw')
}

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  combineReducers({
    ...reducers
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

rootSaga.forEach(saga => sagaMiddleware.run(saga))

// Fetch data on route change
// history.listen(location => {
//   onEnter(match(routes, location), context)
// })

// Render our component according to our routes
function renderApp () {
  Inferno.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()

// Enable hot reloading if available
if (module.hot) {
  module.hot.accept(renderApp)
}
