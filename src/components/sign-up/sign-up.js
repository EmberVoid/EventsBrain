import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
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
    if (this.state.username === '' && this.state.password === ''){
      console.log("No input")
    } else if (this.state.username === '') {
      console.log("No UserName")
    } else if (this.state.password === '') {
      console.log("No password")
    } else {
      console.log(`sign-up handleSubmit, username: ${this.state.username}`)
      event.preventDefault()
      //request to server to add a new username/password
      axios.post('/user/', {
        username: this.state.username,
        password: this.state.password
      })
        .then(response => {
          console.log('Sign up response: ')
          console.log(response)
          if (!response.data.errmsg) {
            console.log('successful signup')
            console.log('Redirecting to login')
            this.setState({
              redirectTo: '/login'
            })
          } else {
            console.log('username already taken')
          }
        }).catch(error => {
          console.log('signup error: ')
          console.log(error)
        })
    }
  }


  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } return (
      <div className="flex items-center justify-center vh-75">
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
        <form className={"measure center"}>
          <fieldset id="log_in" className={"ba b--transparent ph0 mh0"}>
            <h4 className={"f4 fw6 ph0 mh0"}>Sign up</h4>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">Username: </label>
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
                type="submit"
              >Sign up</button>
            </div>
          </fieldset>
        </form>
      </div>

    )
  }
}

export default Signup