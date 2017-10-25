import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/Progress/LinearProgress'
import { subscribe, access, isEmpty, isLoaded } from '../db'

const Protected = ({ auth, children }) => {
  if (!isLoaded(auth)) return (
    <LinearProgress />
  )

  if (isEmpty(auth)) return (
    <div />
  )

  return (
    <div>{children}</div>
  )
}

export default compose(
  subscribe(['auth']),

  connect(state => access(state, {
    auth: ['auth']
  })),
)(Protected)
