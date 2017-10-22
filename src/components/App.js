import React from 'react'
import { Route } from 'react-router-dom'
import Protected from './Protected'
import Items from './Items'
import Edit from './Edit'
import Nav from './Nav'
import Auth from './Auth'

const App = () => (
  <div>
    <Nav>
      <Auth />
    </Nav>

    <Protected>
      <Route exact path="/" component={Items} />
      <Route exact path="/edit/:id" component={Edit} />
    </Protected>
  </div>
)

export default App
