import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Tooltip from 'material-ui/Tooltip'
import { create } from '../db'

const Create = ({ create }) => (
  <Tooltip title="Add" placement="left">
    <Button fab color="primary" aria-label="add" onClick={create}>
      <Icon>add</Icon>
    </Button>
  </Tooltip>
)

export default compose(
  withRouter,

  withHandlers({ create })
)(Create)
