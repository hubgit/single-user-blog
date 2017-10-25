import React from 'react'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import CircularProgress from 'material-ui/Progress/CircularProgress'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import { subscribe, access, isEmpty, isLoaded, login, logout } from '../db'

const Auth = ({ auth, login, logout }) => {
  if (!isLoaded(auth)) return (
    <CircularProgress size={48} />
  )

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
