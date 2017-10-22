import * as React from 'react'
import { compose, withHandlers } from 'recompose'
import { firebaseConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Tooltip } from 'material-ui'

const Create = ({ create }) => (
  <Tooltip title="Add" placement="left">
    <Button fab color="primary" aria-label="add" onClick={create}>
      <Icon>add</Icon>
    </Button>
  </Tooltip>
)

export default compose(
  firebaseConnect(),

  withRouter,

  withHandlers({
    create: ({ firebase, history }) => async () => {
      const created = firebase.database.ServerValue.TIMESTAMP
      const body = '<h1>Untitled</h1>'

      const item = await firebase.push(`/private/metadata`, {
        created
      })
      await firebase.set(`/private/content/${item.key}`, {
        body
      })

      history.push(`/edit/${item.key}`)
    },
  })
)(Create)
