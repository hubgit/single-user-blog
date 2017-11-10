import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Avatar, Button, Icon, IconButton, Tooltip } from 'material-ui'
import { subscribe, access, isEmpty, isLoaded, login, logout } from '../db'

const Auth = ({ auth, connected, login, logout }) => {
  if (!isLoaded(auth)) return null

  if (isEmpty(auth)) return (
    <Button color="primary" onClick={login}>Sign in</Button>
  )

  if (!connected) return (
    <Tooltip title="Offline" placement="left">
      <Icon>cloud_off</Icon>
    </Tooltip>
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
  subscribe([
    'auth',
    '.info/connected'
  ]),

  connect(state => access(state, {
    auth: 'auth',
    connected: ['data', '', 'info', 'connected']
  })),

  withHandlers({ login, logout })
)(Auth)
