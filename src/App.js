import React from 'react'
import { Route } from 'react-router-dom'
import Edit from './pages/Edit'
import Items from './pages/Items'
import Nav from './components/Nav'
import Protected from './components/Protected'

const App = () => (
  <div>
    <Nav/>

    <Protected>
      <Route exact path="/" component={Items}/>
      <Route exact path="/edit/:id" component={Edit}/>
    </Protected>
  </div>
)

export default App
