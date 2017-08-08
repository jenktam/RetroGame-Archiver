import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'; // We need the store to be passed to Provider
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { AddGameContainer, GamesContainer } from './containers'
import { Home, Welcome, About, Contact, Archive } from './components'

//call configureStore function previously exported
const store = configureStore();

const routes = (
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Route path='/' component={ Home } >
        <IndexRoute component={ Welcome } />
        <Route path='/about' component={ About } />
        <Route path='/contact' component={ Contact } />
      </Route>
      <Route path="/games" component={ Archive }>
        <IndexRoute component={ GamesContainer } />
        <Route path='/add' component={ AddGameContainer } />
      </Route>
    </Router>
  </Provider>
)

export default routes
