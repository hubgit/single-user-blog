import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Tooltip } from 'material-ui'
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
