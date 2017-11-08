import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { Icon, Tooltip } from 'material-ui'
import { subscribe, access} from '../db'

const Network = ({ connected }) => {
  if (!isLoaded(connected)) return null
  if (connected) return null

  return (
    <Tooltip title="Offline" placement="left">
      <Icon>cloud_off</Icon>
    </Tooltip>
  )
}

export default compose(
  subscribe([
    '.info/connected'
  ]),

  connect(state => access(state, {
    connected: ['data', '', 'info', 'connected']
  }))
)(Network)
