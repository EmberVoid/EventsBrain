import React from 'react'
import { map } from 'ramda'
import EventList from '../../components/getevent/'
import LoadingScreen from '../../components/loadingscreen/'
import { message, Modal } from 'antd'
import EditEvent from '../../components/editevent/editevent'

import axios from 'axios'


class EventListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      event: [],
      isLoading: false,
      visible: false,
      error: null
    }
    this.checkAssist = this.checkAssist.bind(this)
    this.addUserAssist = this.addUserAssist.bind(this)
    this.RemoveUserAssist = this.RemoveUserAssist.bind(this)
    this.refreshevents = this.refreshevents.bind(this)
    this.DeleteEvent = this.DeleteEvent.bind(this)
    this.getEvent = this.getEvent.bind(this)
    this.handleGet = this.handleGet.bind(this)
    /**Modal */
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleOk.bind(this)
  }

  /**Modal */
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  /**Finished Modal */

  handleGet(event) {
    event.preventDefault()
    //request to server to add a new username/password
    axios.get('events')
      .then(response => {
        console.log('Get events response: ')
        console.log(response.data)
      })
  }

  checkAssist(event) {
    console.log(`Entering checkAssist`)
    event.preventDefault()

    console.log(this.state.event.assists)
    let userArray = this.state.event.assists
    console.log(`Entering checkAssist`)
    let find = this.props.userName
    let found = userArray.find(function (element) {
      return element === `${find}`;
    });

    if (found) {
      console.log("Found this user already");
      this.RemoveUserAssist();
    } else {
      console.log("Want to assist?");
      this.addUserAssist();
    }
  }

  addUserAssist() {
    console.log(this.props.userName)
    axios.put(`events/assist/${this.state.event._id}`, {
      assists: [this.props.userName]
    })
      .then(response => {
        console.log('Put Array response: ')
        console.log(response.data)
        message.success(`Added to the assist list of ${this.state.event.event}!`);
        this.refreshevents();
      })
  }

  RemoveUserAssist() {
    console.log(this.props.userName)
    axios.put(`events/assist/del/${this.state.event._id}`, {
      assists: [this.props.userName]
    })
      .then(response => {
        console.log('Delete Array response: ')
        console.log(response.data)
        message.error(`Deleted from the assist list of ${this.state.event.event}!`);
        this.refreshevents();
      })
  }

  DeleteEvent() {
    axios.delete(`events/${this.state.event._id}`)
      .then(response => {
        console.log('Delete response: ')
        console.log(response.data)
        message.success(`Event ${this.state.event.event} deleted!`);
        this.refreshevents();
      })
  }

  refreshevents() {
    this.setState({ isLoading: true })
    console.log(`ID from eventList: ObjectId("${this.props.userName}")
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

  getEvent(data) {
    this.setState({
      event: data
    });
  }

  async componentWillMount() {
    this.refreshevents();
  }

  eventItemCreator = event =>
    <EventList
      key={event._id}
      event={event}
      DeleteEvent={this.DeleteEvent}
      checkAssist={this.checkAssist}
      handlerFromParant={this.getEvent}
      userName={this.props.userName}
      showModal={this.showModal}
    />

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
        <Modal
          title="Edit Event"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditEvent event={this.state.event} onOk={this.handleOk} refresh={this.refreshevents}/>
        </Modal>
      </div>
    )
  }
}

export default EventListContainer
