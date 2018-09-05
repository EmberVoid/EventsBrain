import React from 'react'
import './index.css';
import 'antd/dist/antd.css';
import { Helmet } from 'react-helmet';
import { Card, Icon, Avatar } from 'antd'
const { Meta } = Card;

const EventList = ({ event }) => {
  return (
    <article className={"flex items-center justify-center vh-100"}>
      <Card
        style={{ 
          width: 500, 
          alignSelf: "center"}}
        cover={<img alt={event.event} src={event.eventAvatar} />}
        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
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
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={event.event}
          description={event.eventDescription}
        />
      </Card>
    </article>
  )
}

export default EventList