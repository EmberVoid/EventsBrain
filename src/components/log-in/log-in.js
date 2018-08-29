import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')

    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/events'
          })
        }
      }).catch(error => {
        console.log('login error: ')
        console.log(error);
      })
  }

  render() {
    let fullbleedBackground = {
      background: 'url(https://i.imgur.com/7Xh2Mah.png)',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      minHeight: '100vh',
    };

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div className={"pa4 black-80"} style={fullbleedBackground}>
          <form className={"measure center"}>
            <fieldset id="sign_up" className={"ba b--transparent ph0 mh0"}>
              <h4 className={"f4 fw6 ph0 mh0"}>Log In</h4>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="username">Username:</label>
                <div className="col-3 col-mr-auto">
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password: </label>
                <div className="col-3 col-mr-auto">
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="mt3 ">
                <button
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  onClick={this.handleSubmit}
                  type="submit">Login</button>
              </div>
            </fieldset>
          </form>
        </div>
      )
    }
  }
}

export default LoginForm