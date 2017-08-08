import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' // bindActionCreators comes handy to wrap action creators in dispatch calls
import Immutable from 'immutable'
import { Modal, GamesListManager } from '../components'
import * as gamesActionCreators from '../actions/games'; // we import all the action-creators to be binded with bindActionCreators

class GamesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    this.props.gamesActions.getGames()
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
    const { selectedGame, searchBar } = this.state
    const { games } = this.props
    console.log("games in GamesContainer:", games)
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

const mapStateToProps = state => ({
  games: state.getIn(['games', 'list'], Immutable.List()).toJS()
})

const mapDispatchToProps = dispatch => ({
  gamesActions: bindActionCreators(gamesActionCreators, dispatch)
}
)
export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
