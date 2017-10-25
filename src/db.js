import firebase from 'firebase'
import get from 'lodash/get'
import mapValues from 'lodash/mapValues'
import { combineReducers, compose, createStore } from 'redux'
import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase'
import { reducer as menuReducer } from './menu'
import { firebase as firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

export const store = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
  reactReduxFirebase(firebase)
)(createStore)(combineReducers({
  firebase: firebaseStateReducer,
  menu: menuReducer
}))

export { firebaseConnect as subscribe, isLoaded, isEmpty } from 'react-redux-firebase'

export const access = (state, fields) => mapValues(fields, path => get(state.firebase, path))

export const login = () => () => firebase.login({
  provider: 'google'
})

export const logout = () => () => firebase.logout({
  provider: 'google'
})

export const create = ({ history }) => async () => {
  const created = firebase.database.ServerValue.TIMESTAMP
  const body = '<h1>Untitled</h1>'

  const item = await firebase.push(`/private/metadata`, {
    created
  })
  await firebase.set(`/private/content/${item.key}`, {
    body
  })

  history.push(`/edit/${item.key}`)
}

export const update = ({ id }) => async ({ body }) => {
  const parser = new DOMParser()

  const doc = parser.parseFromString(body, 'text/html')
  const h1 = doc.querySelector('h1')
  const title = h1 ? h1.textContent : null

  const updated = firebase.database.ServerValue.TIMESTAMP

  // TODO: transaction?

  await Promise.all([
    firebase.update(`/private/content/${id}`, {
      body
    }),
    firebase.update(`/private/metadata/${id}`, {
      title,
      updated
    }),
  ])
}

export const remove = ({ menu: { id }, closeMenu }) => async event => {
  event.preventDefault()

  // TODO: display a modal, or move to bin to allow undelete
  if (!window.confirm('Really delete this item?')) {
    return
  }

  // TODO: transaction?
  await Promise.all([
    firebase.remove(`/public/content/${id}`),
    firebase.remove(`/public/metadata/${id}`),
    firebase.remove(`/private/content/${id}`),
    firebase.remove(`/private/metadata/${id}`),
  ])

  closeMenu()
}

export const publish = ({ id }) => async () => {
  const load = path =>
    firebase.ref(path).once('value').then(snapshot => snapshot.val())

  const metadata = await load(`/private/metadata/${id}`)
  const content = await load(`/private/content/${id}`)

  const updated = firebase.database.ServerValue.TIMESTAMP
  const published = metadata.published || updated

  // TODO: transaction?
  await Promise.all([
    firebase.set(`/public/content/${id}`, {
      ...content
    }),
    firebase.set(`/public/metadata/${id}`, {
      ...metadata,
      published,
      updated
    }),
    firebase.update(`/private/metadata/${id}`, {
      published,
      lastPublished: updated,
    }),
  ])
}

export const unpublish = ({ menu: { id }, closeMenu }) => async event => {
  event.preventDefault()

  await Promise.all([
    firebase.remove(`/public/content/${id}`),
    firebase.remove(`/public/metadata/${id}`),
  ])

  await firebase.update(`/private/metadata/${id}`, {
    published: null
  })

  closeMenu()
}
