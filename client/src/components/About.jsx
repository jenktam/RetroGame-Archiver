import React, { Component } from 'react'

export default class About extends Component {
  render(){
    return(
      <div className="inner cover">
        <h1 className="cover-heading">Javascript Everywhere</h1>
        <p className="lead">This archive is made with Node.js and React. The two communicate through async HTTP requests handled by Redux-saga... Yes there's a love lof Redux love in this app!</p>
      </div>
    )
  }
}
