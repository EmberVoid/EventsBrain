import React, { Component } from 'react'
import './gravity.css';
import { Helmet } from 'react-helmet';

class Home extends Component {
  render() {
    return (
      <div className={"flex items-center justify-center vh-100"}>
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
        <section className={"self-center"}>
          <img src="https://www.khcas.on.ca/foundation/wp-content/uploads/sites/16/2018/02/Konrad-Group-1024x1024.png" width="250" height="250" alt=""/>
        </section>
        
        <h1 className={"text"}>Events</h1>
      </div>
    )
  }
}

export default Home
