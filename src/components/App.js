import React from 'react'
import { Route } from 'react-router-dom'
import Auth from './Auth'
import Edit from './Edit'
import Items from './Items'
import Nav from './Nav'
import Protected from './Protected'

const App = () => (
  <div>
    <Nav>
      <Auth/>
    </Nav>

    <Protected>
      <Route exact path="/" component={Items}/>
      <Route exact path="/edit/:id" component={Edit}/>
    </Protected>
  </div>
)

export default App
