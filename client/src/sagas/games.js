import { takeLatest } from 'redux-saga' // import a saga helper
import { pull, call } from 'redux-saga/effects' //Sage effects are useful to interact with the sage middleware
import { GET_GAMES } from '../constants/games' //as predicted, a saga will take care of GET_GAMES actions
import { getGamesSuccess, getGamesFailure } from '../actions/games' //either one yielded once the fetch is done

// We moved the fetch from GamesContainer
const fetchGames = () => {
  return fetch('http://localhost:8080/games', {
    // Set the header content-type to application/json
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json())
};

// yield call to fetchGames is in a try catch to control the flow even when the promise rejects
function* getGames () {
  try {
    const games = yield call(fetchGames);
    yield put(getGamesSuccess(games));
  } catch (err) {
    yield put(getGamesFailure());
  }
}

// The watcher saga waits for dispatched GET_GAMES actions
function* watchGetGames () {
  yield takeLatest(GET_GAMES, getGames);
}

// Export the watcher to be run in parallel in sagas/index.js
export {
    watchGetGames
};
