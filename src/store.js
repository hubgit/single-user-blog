import { combineReducers, compose, createStore } from 'redux'
import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { config } from './config/firebase'
import { reducer as menuReducer } from './menu'

firebase.initializeApp(config)

export default (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
  reactReduxFirebase(firebase)
)(createStore)(combineReducers({
  firebase: firebaseStateReducer,
  menu: menuReducer
}))
