import React from 'react'
import { map } from 'ramda'
import EventList from '../../components/getevent/'
import LoadingScreen from '../../components/loadingscreen/'
import axios from 'axios'


class EventListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      isLoading: false,
      error: null
    }
  }

  handleGet(event) {
    event.preventDefault()
    //request to server to add a new username/password
    axios.get('events')
      .then(response => {
        console.log('Get events response: ')
        console.log(response.data)
      })
  }

  async componentWillMount() {
    this.setState({ isLoading: true})
    console.log(`ID from eventList: ObjectId("${this.props.id}")
      Name ${this.props.userName}`)


    try {
      axios.get('events')
        .then(response => {
          let testValue = Object.values(response.data.events)
          console.log("Response.data")
          console.log(response.data.events)
          this.setState({
            events: testValue,
            isLoading: false
          })
          console.log("object.value")
          console.log(this.state.events)
        })
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      })
    }
  }

  eventItemCreator = event => <EventList key={event._id} event={event} id={this.props.id} />

  render() {
    const { isLoading, error, events } = this.state

    return (
      <div>
        {
          isLoading
            ? <LoadingScreen />
            : error
              ? <p>Error...</p>
              : (
                map(this.eventItemCreator, events)
              )
        }
      </div>
    )
  }
}

export default EventListContainer
