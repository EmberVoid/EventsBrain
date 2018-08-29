import React, { Component } from 'react'
import './gravity.css';

class Home extends Component {
    render() {
        let fullbleedBackground = {
            background: 'url(https://i.imgur.com/mx4gHaS.png)',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            minHeight: '100vh',
          };
        return (
            <div style={fullbleedBackground}>
                <h1 className={"text"}>Events</h1>
            </div>
        )
    }
}

export default Home
