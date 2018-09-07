import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//LandingPage
import Home from './components/home/home'

// components
import Navbar from './components/navbar/navbar'
import Signup from './components/sign-up/sign-up';
import LoginForm from './components/log-in/log-in';
import GetEvent from './containers/eventList/'
import AddEvent from './components/addevent/addevent'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          id: null
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn &&
            <Route
              path="/events"
              render={() =>
                <GetEvent id={this.state.id} userName={this.state.username}/>}
            />}
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' render={() => <LoginForm updateUser={this.updateUser} />} />
              <Route path='/signup' component={Signup} />
              <Route path='/addevent' component={AddEvent} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
