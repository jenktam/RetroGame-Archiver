import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' // bindActionCreators comes handy to wrap action creators in dispatch calls
import Immutable from 'immutable'
import { Modal, GamesListManager } from '../components'
import * as gamesActionCreators from '../actions/games'; // we import all the action-creators to be binded with bindActionCreators

class GamesContainer extends Component {
  constructor(props) {
    super(props)

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
    // We pass the game given the index parameter passed from the view button
    this.props.gamesActions.showSelectedGame(this.props.games[index]);
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

  // It now dispatches the action and pass the search bar content as parameter
  setSearchBar (event) {
    this.props.gamesActions.setSearchBar(event.target.value.toLowerCase());
  }

  render() {
    const { games, searchBar, selectedGame } = this.props
    console.log("games in GamesContainer:", games)
    return (
      <div>
        <Modal game={ selectedGame } />
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
  games: state.getIn(['games', 'list'], Immutable.List()).toJS(),
  searchBar: state.getIn(['games', 'searchBar']), //retrieve searchBar content too
  selectedGame: state.getIn(['games', 'selectedGame'], Immutable.List()).toJS() //map selectedGame from state to props so now available as this.props.selectedGame
})

const mapDispatchToProps = dispatch => ({
  gamesActions: bindActionCreators(gamesActionCreators, dispatch)
}
)
export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
