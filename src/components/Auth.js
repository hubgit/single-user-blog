import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Avatar, Button, IconButton, Tooltip } from 'material-ui'
import { subscribe, access, isEmpty, isLoaded, login, logout } from '../db'

const Auth = ({ auth, login, logout }) => {
  if (!isLoaded(auth)) return null

  if (isEmpty(auth)) return (
    <Button color="primary" onClick={login}>Sign in</Button>
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
  subscribe(['auth']),

  connect(state => access(state, {
    auth: 'auth'
  })),

  withHandlers({ login, logout })
)(Auth)
