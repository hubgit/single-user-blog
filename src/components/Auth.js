import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { Avatar, Button, CircularProgress, IconButton, Tooltip } from 'material-ui'

const provider = 'google'

const Auth = ({ classes, auth, login, logout }) => {
  if (!isLoaded(auth)) return <CircularProgress size={48} />

  if (isEmpty(auth))
    return (
      <Button color="primary" onClick={login}>
        Sign in
      </Button>
    )

  return (
    <Tooltip title="Sign out" placement="left">
      <IconButton onClick={logout}>
        <Avatar src={auth.photoURL} />
      </IconButton>
    </Tooltip>
  )
}

export default compose(
  firebaseConnect(['/auth']),

  connect(state => ({
    auth: state.firebase.auth,
  })),

  withHandlers({
    login: ({ firebase }) => () => firebase.login({ provider }),
    logout: ({ firebase }) => () => firebase.logout({ provider }),
  })
)(Auth)
