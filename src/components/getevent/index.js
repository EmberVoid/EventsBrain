import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Card, Button, Badge } from 'antd'
import moment from 'moment'

import './index.css';
import 'antd/dist/antd.css';

const { Meta } = Card;

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
    }
    this.handleLangChange = this.handleLangChange.bind(this)
  }

  handleLangChange = (evt) => {
    evt.preventDefault();
    var event = this.props.event
    this.setState({
      event: event
    });
    this.props.handlerFromParant(event);
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
          actions={[
            <Button icon="edit" onClick={this.props.showModal} onMouseEnter={this.handleLangChange} className={"ant-btn-transparent"}>Edit</Button>,
            <Badge count={this.props.event.assists.length}><Button icon="plus" onClick={this.props.checkAssist} onMouseEnter={this.handleLangChange} className={"ant-btn-transparent"}>Assist</Button></Badge>]}
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