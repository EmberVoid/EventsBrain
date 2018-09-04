import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datetime';
import moment from 'moment';
import axios from 'axios'
import Select from 'react-select';
import Dropzone from 'react-dropzone'

import './timepicker.css';

const price = [
  { value: '0', label: 'Free' },
  { value: '500', label: '₡ 500' },
  { value: '1000', label: `₡ 1'000` }
];

const space = [
  { value: '0', label: 'Unlimited' },
  { value: '1', label: `1` },
  { value: '2', label: `2` },
  { value: '3', label: `3` },
  { value: '4', label: `4` },
  { value: '5', label: `5` },
  { value: '6', label: `6` },
  { value: '7', label: `7` },
  { value: '8', label: `8` },
  { value: '9', label: `9` },
  { value: '10', label: `10` }
];

class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      eventDescription: '',
      eventDate: '',
      eventLocation: '',
      eventPrice: null,
      eventSpace: null,
      eventAvatar: '',
      errors: {},
      redirectTo: null,
      startDate: moment(),
    }
    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
    this.handleSpace = this.handleSpace.bind(this)
  }

  handleSpace = (eventSpace) => {
    this.setState({ eventSpace });
  }

  handlePrice = (eventPrice) => {
    this.setState({ eventPrice });
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

  handleDrop = (files) => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "xvgzugle"); // Replace the preset name with your own
      formData.append("api_key", "797695484591968"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post("https://api.cloudinary.com/v1_1/embervoid/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        this.setState({
          eventAvatar: fileURL
        })
        console.log(data);
      })

    });

    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
  }

  handleAddEvent(event) {
    event.preventDefault()
    //request to server to add a new username/password
    axios.post('events/addevent', {
      event: this.state.event,
      eventDescription: this.state.eventDescription,
      eventDate: this.state.startDate,
      eventLocation: this.state.eventLocation,
      eventPrice: this.state.eventPrice.value,
      eventSpace: this.state.eventSpace.value,
      eventAvatar: this.state.eventAvatar,
    })
      .then(response => {
        console.log('Get events response: ')
        console.log(response)
      })
  }


  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } return (
      <div className="pa4 black-80">
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
              <label className="db fw6 lh-copy f6" htmlFor="eventDate">Date of the event: </label>
              <div className={"col-3 col-mr-auto"}>
                <DatePicker
                  className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  value={this.state.startDate}
                  onChange={this.handleDate} />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventPrice">Price of the event: </label>
              <div className="col-3 col-mr-auto">
                <Select
                  className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  value={this.state.eventPrice}
                  onChange={this.handlePrice}
                  options={price}
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">Available Space: </label>
              <div className="col-3 col-mr-auto">
                <Select
                  className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  value={this.state.eventSpace}
                  onChange={this.handleSpace}
                  options={space}
                />
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
              <label className="db fw6 lh-copy f6" htmlFor="Image of the vent">Image of the vent: </label>
              <div className="col-3 col-mr-auto">
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  id="eventAvatar"
                  name="eventAvatar"
                  placeholder="Image"
                  value={this.state.eventAvatar}
                  onChange={this.handleChange}
                />
                <Dropzone
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onDrop={this.handleDrop}
                  multiple
                  accept="image/*"
                >
                  <p>Drop your files or click here to upload</p>
                </Dropzone>
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