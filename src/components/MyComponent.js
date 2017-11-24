import Inferno from 'inferno'
import Component from 'inferno-component'

class MyComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0
    }
  }
  render () {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: { this.state.counter }</span>
      </div>
    )
  }
}

export default MyComponent
