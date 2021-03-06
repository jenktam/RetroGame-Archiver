import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Form } from '../components/Form'

export default class AddGameContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newGame: {}
    }

    // // Bind this (context) to functions passed down to children components
    this.submit = this.submit.bind(this)
    this.uploadPicture = this.uploadPicture.bind(this)
    this.setGame = this.setGame.bind(this)
  }

  //sends new game to server via POST request
  submit(){
    const newGame = Object.assign({},
      {
        picture: $('#picture').attr('src')
      },
      this.state.newGame
    );

    fetch('http://localhost:8080/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(newGame)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      // We go back to the games list view
      hashHistory.push('/games');
    })
    .catch(console.error.bind("Error!!:", console))
  }

  uploadPicture () {
    filepicker.pick (
      {
        mimetype: 'image/*', // Cannot upload other files but images
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER' // First choice to upload files from
      },
      function (Blob) {
        console.log(JSON.stringify(Blob));
        $('#picture').attr('src', Blob.url);
      },
      function (FPError) {
        console.log(FPError.toString());
      }
    );
  }
  // We make sure to keep the state up-to-date to the latest input values
  setGame () {
    const newGame = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      year: document.getElementById('year').value,
      picture: $('#picture').attr('src')
    };
    this.setState({ newGame });
  }
  render () {
    return <Form
      submit={this.submit}
      uploadPicture={this.uploadPicture}
      setGame={this.setGame}
    />
  }
}
