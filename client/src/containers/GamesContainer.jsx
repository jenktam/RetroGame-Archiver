import React, { Component } from 'react'
import { Modal, GamesListManager } from '../components'

export default class GamesContianer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      selectedGame: {},
      searchBar: ''
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.deleteGame = this.deleteGame.bind(this)
    this.setSearchBar = this.setSearchBar.bind(this)
  }

  // Once the component mounted it fetches the data from the server
  componentDidMount () {
    this.getGames();
  }

  //toggle between games
  toggleModal(index) {
    this.setState({
      selectedGame: this.state.games[index]
    })
    $('#game-model').modal()
  }

  //get all games
  getGames(){
    fetch('http://localhost:8080/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => this.setState({
      games: data
    }))
    .catch(console.error.bind(console))
  }

  deleteGame(id) {
    fetch(`http://localhost:8080/games/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        games: this.state.games.filter( game => game._id !== id )
      })
    })
    .catch(console.error.bind(console))
  }

  setSearchBar(event) {
    this.setState({
      searchBar: event.target.value.toLowerCase() //ensures search isn't case sensitive
    })
  }

  render() {
    const { games, selectedGame, searchBar } = this.state
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games = { games }
          searchBar = { searchBar }
          setSearchBar = { this.setSearchBar }
          toggleModal = { this.toggleModal }
          deleteGame = { this.deleteGame }
        />
      </div>
    )
  }
}
