import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import get from 'lodash/get'
import mapValues from 'lodash/mapValues'
import { combineReducers, compose, createStore } from 'redux'
import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase'

const config = () => {
  if (process.env.NODE_ENV === 'production') {
    return fetch('/__/firebase/init.json')
      .then(response => response.json())
  }

  return Promise.resolve({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  })
}

export const setup = async () => {
  await config().then(firebase.initializeApp)

  return (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    reactReduxFirebase(firebase, {
      userProfile: 'users'
    })
  )(createStore)(combineReducers({
    firebase: firebaseStateReducer,
  }))
}

export { firebaseConnect as subscribe, isLoaded, isEmpty } from 'react-redux-firebase'

export const access = (state, fields) => {
  return mapValues(fields, path => get(state.firebase, path))
}

export const login = () => () => firebase.login({
  provider: 'google'
})

export const logout = () => () => firebase.logout({
  provider: 'google'
})

export const create = ({ history }) => async () => {
  const created = firebase.database.ServerValue.TIMESTAMP
  const body = '<h1></h1>'

  const uid = firebase.auth().currentUser.uid

  const item = await firebase.push(`/private/${uid}/metadata`, {
    created
  })

  await firebase.set(`/private/${uid}/content/${item.key}`, {
    body
  })

  history.push(`/edit/${item.key}`)
}

export const update = ({ id }) => async body => {
  const parser = new DOMParser()

  const doc = parser.parseFromString(body, 'text/html')
  const h1 = doc.querySelector('h1')
  const title = h1 ? h1.textContent : null

  const uid = firebase.auth().currentUser.uid

  // TODO: transaction?

  await Promise.all([
    firebase.update(`/private/${uid}/content/${id}`, {
      body
    }),
    firebase.update(`/private/${uid}/metadata/${id}`, {
      title,
      updated: firebase.database.ServerValue.TIMESTAMP
    }),
  ])
}

export const remove = ({ menu: { id }, closeMenu }) => async event => {
  event.preventDefault()

  // TODO: display a modal, or move to bin to allow undelete
  if (!window.confirm('Really delete this item?')) {
    return
  }

  const uid = firebase.auth().currentUser.uid

  // TODO: transaction?
  await Promise.all([
    firebase.remove(`/public/${uid}/content/${id}`),
    firebase.remove(`/public/${uid}/metadata/${id}`),
    firebase.remove(`/private/${uid}/content/${id}`),
    firebase.remove(`/private/${uid}/metadata/${id}`),
  ])

  closeMenu()
}

export const publish = ({ id }) => async () => {
  const load = path => (
    firebase.ref(path).once('value').then(snapshot => snapshot.val())
  )

  const uid = firebase.auth().currentUser.uid

  const metadata = await load(`/private/${uid}/metadata/${id}`)
  const content = await load(`/private/${uid}/content/${id}`)

  const updated = firebase.database.ServerValue.TIMESTAMP
  const published = metadata.published || updated

  // TODO: transaction?
  await Promise.all([
    firebase.set(`/public/content/${id}`, {
      ...content,
      owner: uid,
    }),
    firebase.set(`/public/metadata/${id}`, {
      ...metadata,
      owner: uid,
      published,
      updated
    }),
    firebase.update(`/private/${uid}/metadata/${id}`, {
      published,
      lastPublished: updated,
    }),
  ])
}

export const unpublish = ({ menu: { id }, closeMenu }) => async event => {
  event.preventDefault()

  const uid = firebase.auth().currentUser.uid

  await Promise.all([
    firebase.remove(`/public/content/${id}`),
    firebase.remove(`/public/metadata/${id}`),
  ])

  await firebase.update(`/private/${uid}/metadata/${id}`, {
    published: null
  })

  closeMenu()
}
