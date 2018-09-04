import React from 'react'
import './index.css';
import 'antd/dist/antd.css';
import { Helmet } from 'react-helmet';

const EventList = ({ event }) => {
  return (

    <article>
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
      <div className={"cf pa2"}>
        <div className={"fl w-50 w-25-m w-20-l pa2 bg-near-white"}>
          <span className={"db link dim tc "}>
            <img src={event.eventAvatar} alt={event.event} className={"w-100 db outline black-10"} />
            <dl className={"mt2 f6 lh-copy"}>
              <dd className={"ml0 black truncate w-100"}>{event.event}</dd>
              <dd className={"ml0 gray truncate w-100"}>{event.eventLocation}</dd>
            </dl>
          </span>
        </div>
      </div>
    </article>

  )
}
//#2751D3

export default EventList