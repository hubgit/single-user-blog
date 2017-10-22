import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import store from './store'
import theme from './theme'
import './index.css'

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
