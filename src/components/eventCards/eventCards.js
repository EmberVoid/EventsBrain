import React, { Component } from 'react'
import axios from 'axios'

class EventCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      isLoading: false,
      error: null,
    }
    this.handleGet = this.handleGet.bind(this)
  }

  handleGet(event) {
    event.preventDefault()
    //request to server to add a new username/password
    try {
      axios.get('events')
        .then(response => {
          this.setState({
            events: response.data,
            isLoading: false
          })
          console.log(this.state.events)
        })
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      })
    }
  }

  render() {
    return (
      <section>
        <button
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          onClick={this.handleGet}
          type="submit"
        >GetAxios</button>
        <article className={"br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center"}>
          <img src="http://placekitten.com/g/600/300" className={"db w-100 br2 br--top"} alt="Kitten looking menacing." />
          <div className={"pa2 ph3-ns pb3-ns"}>
            <div className={"dt w-100 mt1"}>
              <div className={"dtc"}>
                <h1 className={"f5 f4-ns mv0"}>Cat</h1>
              </div>
              <div className={"dtc tr"}>
                <h2 className={"f5 mv0"}>$1,000</h2>
              </div>
            </div>
            <p className={"f6 lh-copy measure mt2 mid-gray"}>
              If it fits, i sits burrow under covers. Destroy couch leave hair everywhere,
              and touch water with paw then recoil in horror.
    </p>
          </div>
        </article>
      </section>
    )
  }
}

export default EventCards
