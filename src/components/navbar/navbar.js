import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './navbar.css';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      redirectTo: null
    }

    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')

    axios
      .post('/user/logout')
      .then(response => {
        console.log('Logout response: ')
        console.log(response.data)
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: false,
            username: null
          })
        }
      }).catch(error => {
        console.log('Logout error')
        console.log(error);
      })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ')
    console.log(this.props);

    return (
      <nav className="flex justify-between bb b--white-10 fixed zIndex1" id="nav-container">
        {loggedIn ? (
          <section className="flex-grow pa3 flex items-center">
          <Link to="/addevent" >
              <span className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20">Add Event</span>
            </Link>
            <Link to="/events" >
              <span className="f6 link dib white dim mr3 mr4-ns ml3">Events</span>
            </Link>
            <Link to="/" >
              <span className="f6 link dib white dim mr3 mr4-ns" onClick={this.logout}>logout</span>
            </Link>
          </section>
        ) : (
            <section className="flex-grow pa3 flex items-center">
              <Link to="/" >
                <span className="f6 link dib white dim mr3 mr4-ns">Home</span>
              </Link>
              <Link to="/login">
                <span className="f6 link dib white dim mr3 mr4-ns">Log In</span>
              </Link>
              <Link to="/signup">
                <span className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20">Sign Up</span>
              </Link>
            </section>
          )}
      </nav>
    );
  }

}

export default Navbar
