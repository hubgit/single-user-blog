import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps } from 'recompose'
import LinearProgress from 'material-ui/Progress/LinearProgress'
import Button from 'material-ui/Button'
import withStyles from 'material-ui/styles/withStyles'
import Editor from '@aeaton/editor-contenteditable'
import { subscribe, isLoaded, isEmpty, publish, update, access } from '../db'

const canPublish = metadata => {
  if (!metadata.title) return false
  if (!metadata.lastPublished) return true
  if (!metadata.published) return true
  return metadata.updated > metadata.lastPublished
}

const Edit = ({ classes, content, metadata, publish, update }) => {
  if (!isLoaded(content)) return (
    <LinearProgress />
  )

  if (isEmpty(content)) return (
    <div>Not found</div>
  )

  const PublishButton = () => (
    <Button
      color="primary"
      raised
      disabled={!canPublish(metadata)}
      onClick={publish}>
      Publish
    </Button>
  )

  return (
    <div className={classes.editor}>
      <Editor
        value={content.body}
        onChange={update}
        components={{ PublishButton }}
      />
    </div>
  )
}

export default compose(
  // get the id from the router
  withProps(props => ({
    id: props.match.params.id,
  })),

  // fetch the metadata and content from the database into the store
  subscribe(({ id }) => [
    ['private', 'metadata', id],
    ['private', 'content', id],
  ]),

  // load the metadata and content from the store
  connect((state, { id }) => access(state, {
    metadata: ['private', 'metadata', id],
    content: ['private', 'content', id],
  })),

  // write to the database on events
  withHandlers({ publish, update }),

  // fill the page
  withStyles({
    editor: {
      position: 'fixed',
      top: 48,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
  }, {
    name: 'Edit'
  }),
)(Edit)
