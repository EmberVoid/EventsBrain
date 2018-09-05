import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { Form, Input, Tooltip, Icon, Button } from "antd";
import axios from 'axios'

import "antd/dist/antd.css"

const FormItem = Form.Item;

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      confirmDirty: false,
      redirectTo: null

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
    this.validateToNextPassword = this.validateToNextPassword.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(`sign-up handleSubmit, username: ${this.state.username}`)
        event.preventDefault()
        //request to server to add a new username/password
        axios.post('/user/', {
          username: values.nickname,
          password: values.password
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
    });
  }

  handleConfirmBlur = event => {
    const value = event.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } return (
      <div className="flex items-center justify-center vh-100">
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
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              onClick={this.handleSubmit}
            >
              Register
          </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create()(Signup);

export default WrappedRegistrationForm