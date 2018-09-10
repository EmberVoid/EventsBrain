import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DatePicker from 'react-datetime'
import moment from 'moment'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { Helmet } from 'react-helmet'
import { InputNumber } from 'antd';

import './editevent.css';
import 'antd/dist/antd.css';

class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: this.props.event.event,
      eventDescription: this.props.event.eventDescription,
      eventDate: this.props.event.eventDate,
      eventLocation: this.props.event.eventLocation,
      eventPrice: this.props.event.eventPrice,
      eventAvatar: this.props.event.eventAvatar,
      errors: {},
      redirectTo: null,
      startDate: moment(),
    }
    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
  }

  handlePrice = (eventPrice) => {
    this.setState({ eventPrice });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log('changed', event.target.value);
  }

  handleDate(date) {
    this.setState({
      startDate: date.toDate()
    })
    console.log(this.state.startDate)
  }

  handleDrop = (files) => {
    this.setState({
      eventAvatar: 'https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'
    })
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
    axios.put(`events/assist/update/${this.props.event._id}`, {
      event: this.state.event,
      eventDescription: this.state.eventDescription,
      eventDate: this.state.startDate,
      eventLocation: this.state.eventLocation,
      eventPrice: this.state.eventPrice,
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
      <div className="flex items-center justify-center">
        <Helmet>
          <style type="text/css">{`
          body {
            background: linear-gradient(315deg, rgba(255,255,255,1) 50%, #1A8CCF 50%);
            background-repeat: no-repeat;
            background-attachment: fixed;
            height: 100vh,
            width: 100vw
          }
          `}</style>
        </Helmet>
        <form className={"measure center flexAuto"}>
          <fieldset id="log_in" className={"ba b--transparent ph0 mh0"}>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="event">Name of the event:</label>
              <div className="col-3 col-mr-auto">
                <input className="w-100 addEvent-InputName"
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
                  value={this.state.startDate}
                  onChange={this.handleDate} />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventPrice">Price of the event: </label>
              <div className="col-3 col-mr-auto">
                <InputNumber
                  defaultValue={this.props.event.eventPrice}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={this.handlePrice}
                  className={" w-100"}
                  size="small"
                />
              </div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="eventLocation">Location of the event: </label>
              <div className="col-3 col-mr-auto">
                <input className="w-100 addEvent-InputName"
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
                <div className={"flex items-center justify-center"}>
                  <img src={this.state.eventAvatar} alt="Preview" className={"imgThumbnail pa2 mt3 mb4 bg-near-white measure center flexAuto"} />
                </div>
                <Dropzone
                  className="w-100 addEvent-InputName"
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
                <textarea className="w-100 addEvent-InputDescription"
                  type="text"
                  id="eventDescription"
                  name="eventDescription"
                  placeholder="Event Description"
                  maxLength={"500"}
                  value={this.state.eventDescription}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="mt3 ">
              <button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                onClick={this.props.refreshevents}
                onMouseEnter={this.handleAddEvent}
              >Submit event</button>
            </div>
          </fieldset>
        </form>
      </div>

    )
  }
}

export default AddEvent