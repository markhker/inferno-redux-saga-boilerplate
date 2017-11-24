import Inferno from 'inferno'
import Component from 'inferno-component'
class App extends Component {
  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default App
