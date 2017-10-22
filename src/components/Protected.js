import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { LinearProgress } from 'material-ui'

const Protected = ({ auth, children }) => {
  if (!isLoaded(auth)) return <LinearProgress />

  if (isEmpty(auth)) return <div />

  return <div>{children}</div>
}

export default compose(
  firebaseConnect(['/auth']),

  connect(state => ({
    auth: state.firebase.auth,
  }))
)(Protected)
