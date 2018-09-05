import React, { Component } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Redirect, Link } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit')
        axios
          .post('/user/login', {
            username: values.userName,
            password: values.password
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
    });
  }

  handleToSignUp(event) {
    event.preventDefault()
    this.setState({
      redirectTo: '/signup'
    });

  }


  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className={"flex items-center justify-center vh-100"} >
          <Form onSubmit={this.handleSubmit} className={"login-form measure center"}>
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
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "Please input your username!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input your Password!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="w-100"
                onClick={this.handleSubmit}
              >
                Log in
          </Button>
            </FormItem>
            <Link to="/signup">
              <Button
                htmlType="submit"
                className="w-100"
              >
                or register now!
          </Button>
            </Link>
          </Form>
        </div>
      )
    }
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm