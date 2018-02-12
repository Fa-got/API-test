import React, { Component } from 'react'
import Google from './component/googlePlaces.jsx';
import Header from './component/header';
import Foursquare from './component/foursquare.jsx'

export default class Comp extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return (
      <div className="Comp">
        <h1>
          <Header />
        </h1>  
          <Google />
          <Foursquare />
      </div>
    )
  }
}
