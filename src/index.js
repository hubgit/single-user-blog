import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui'
import { BrowserRouter } from 'react-router-dom'

import 'typeface-roboto'
import 'material-design-icons/iconfont/material-icons.css'
import './index.css'

import { store } from './db'
import theme from './theme'

import App from './components/App'

const render = () => {
  ReactDOM.render(
    <StoreProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </MuiThemeProvider>
    </StoreProvider>,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render()
  })
}
