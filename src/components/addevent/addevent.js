import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datetime';
import moment from 'moment';
import axios from 'axios'

import './timepicker.css';

class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      eventDescription: '',
      eventDate: '',
      eventLocation: '',
      eventPrice: '',
      eventSpace: '',
      eventAvatar: '',
      errors: {},
      redirectTo: null,
      startDate: moment()
    }
    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleDate(date) {
    this.setState({
      startDate: date.toDate()
    })
    console.log(this.state.startDate)
  }

  handleAddEvent(event) {
    event.preventDefault()
    //request to server to add a new username/password
    axios.post('events/addevent', {
      event: this.state.event,
      eventDescription: this.state.eventDescription,
      eventDate: this.state.startDate,
      eventLocation: this.state.eventLocation,
      eventPrice: this.state.eventPrice,
      eventSpace: this.state.eventSpace,
      eventAvatar: this.state.eventAvatar,
    })
      .then(response => {
        console.log('Get events response: ')
        console.log(response)
      })
  }


  render() {
    let fullbleedBackground = {
      background: 'url(https://i.imgur.com/PFejiVc.png)',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      minHeight: '100vh',
    };

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } return (
      <div className="pa4 black-80" style={fullbleedBackground}>
        <form className={"measure center"}>
          <fieldset id="log_in" className={"ba b--transparent ph0 mh0"}>
            <h4 className={"f4 fw6 ph0 mh0"}>Add event</h4>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="event">Name of the event:</label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="event"
                  name="event"
                  placeholder="Name of the event"
                  value={this.state.event}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventDescription">Description of the event:</label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="eventDescription"
                  name="eventDescription"
                  placeholder="Event Description"
                  value={this.state.eventDescription}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventDate">Date of the event: </label>
              <div className={"col-3 col-mr-auto"}>
                <DatePicker 
                className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                value = {this.state.startDate}
                onChange={this.handleDate}/>
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventLocation">Location of the event: </label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="eventLocation"
                  name="eventLocation"
                  placeholder="Event Location"
                  value={this.state.eventLocation}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventPrice">Price of the event: </label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="eventPrice"
                  name="eventPrice"
                  placeholder="Event Location"
                  value={this.state.eventPrice}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">Available Space: </label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="eventSpace"
                  name="eventSpace"
                  placeholder="Available Space"
                  value={this.state.eventSpace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="Image of the vent">Image of the vent: </label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="eventAvatar"
                  name="eventAvatar"
                  placeholder="Available Space"
                  value={this.state.eventAvatar}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3 ">
              <button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                onClick={this.handleAddEvent}
                type="submit"
              >Submit event</button>
            </div>
          </fieldset>
        </form>
      </div>

    )
  }
}

export default AddEvent