import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import { Card, Icon, Button } from 'antd'
import moment from 'moment'
import axios from 'axios'

import './index.css';
import 'antd/dist/antd.css';

const { Meta } = Card;

class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectTo: null
    }
    this.addUserAssist = this.addUserAssist.bind(this)
  }

  componentDidMount() {
    this.checkAssist()
  }

  checkAssist() {

  }

  addUserAssist(event) {
    event.preventDefault()

    let userArray = this.props.event.assists
    let find = this.props.id
    var found = userArray.find(function (element) {
      return element === `${find}`;
    });

    if (found) {
      console.log("Found this user already");
    } else {
      console.log(this.props.id)
      axios.put(`events/${this.props.event._id}`, {
        assists: [this.props.id]
      })
        .then(response => {
          console.log('Put Array response: ')
          console.log(response.data)
        })
    }
  }


  render() {
    let local_date = moment.utc(this.props.event.eventDate).local().format('YYYY-MM-DD hh:mm A');

    return (
      <article className={"flex items-center justify-center vh-100 minVerticalHeight"}>
        <Card
          style={{
            width: 500,
            alignSelf: "center",
            marginTop: '3em'
          }}
          cover={<img alt={this.props.event.event} src={this.props.event.eventAvatar} />}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Button icon="plus" onClick={this.addUserAssist} className={"ant-btn-transparent"}>Assist</Button>]}
        >
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
          <Meta
            title={this.props.event.event}
            description={this.props.event.eventDescription}
          />
          <div><p className={"dib pt3"}><strong>Time and date: </strong></p> <span className={"tr dib"}>{local_date}</span></div>
          <div><p className={"dib"}><strong>Location: </strong></p> <span className={"tr dib"}>{this.props.event.eventLocation}</span></div>
          <div><p className={"dib"}><strong>Price: </strong></p> <span className={"tr dib"}>${this.props.event.eventPrice}</span></div>
        </Card>
      </article>
    )
  }
}

export default EventList