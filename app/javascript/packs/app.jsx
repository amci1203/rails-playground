// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    input    : '',
    response : {},
    waiting  : false
  }

  handle = e => {
    this.setState({ input: e.target.value })
  }

  submit = async e => {
    e.preventDefault()

    this.setState({ waiting: true })
    const url = encodeURI(`/tests?name=${this.state.input}`)
    
    try {
      const data = await fetch(url)
      if (!data.ok) throw new Error('Bad network response')
      const json = await data.json()
      this.setState({ response: json })
    } catch (err) {
      console.error(err)
      this.setState({ response: "Seems like we're having some technical difficulties, folks." })
    }

    this.setState({ waiting: false })
    return false
  }

  render () {
    const { state, handle, submit } = this

    let output = null

    if (state.response === null) {
      output = (
        <div className='response'>
          We have no idea who that is. There's a list&mdash;use it, kthx.
        </div>
      )
    } else if (state.response.name) {
      output = (
        <div className='response'>
          According to our sources, {state.response.name} is { state.response.funny ? 'freaking hilarious!' : 'not funny.'}
        </div>
      )
    } else if (typeof state.response == 'string') {
      output = <div className='response'>{state.response}</div>
    }

    const loading = state.waiting ? (
      <div className="waiting">
        Discussing with our peers...
      </div>
    ) : null

    return (
      <main>
        <h1>Ha-Ha List</h1>

        <form onSubmit={submit}>
          <label>
            <span>Enter a name&mdash;let's see if they're funny</span>
            <input value={state.input} onChange={handle} list='names' />

            <input type="submit" value='submit' />
          </label>
        </form>

        <h2>Response</h2>
        { loading || output }
      </main>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  )
})
