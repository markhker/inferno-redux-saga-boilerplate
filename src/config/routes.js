import Inferno from 'inferno'
import { Route, IndexRoute } from 'inferno-router'
import App from '../pages/App/App'
// import NotFound from '../pages/404'
import Homepage from '../pages/Homepage/Homepage'
import MyComponent from '../components/MyComponent'

export default (
  <Route component={App}>
    <IndexRoute component={Homepage} />
    <Route path='/next' component={MyComponent} />
    {
      /*
        <Route path="*" component={ NotFound }/>
      */
    }
  </Route>
)
