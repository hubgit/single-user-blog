import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps } from 'recompose'
import { LinearProgress, Button, withStyles } from 'material-ui'
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'
import { subscribe, access, isLoaded, isEmpty, publish, update } from '../db'
import styles from './Edit.style'

const canPublish = metadata => {
  if (!metadata.title) return false
  if (!metadata.lastPublished) return true
  return metadata.updated > metadata.lastPublished
}

const Edit = ({ classes, content, metadata, publish, update }) => {
  if (!isLoaded(content)) return (
    <LinearProgress />
  )

  if (isEmpty(content)) return (
    <div>Not found</div>
  )

  const SubmitButton = () => (
    <Button
      color="primary"
      raised
      dense
      disabled={!canPublish(metadata)}
      onClick={publish}>
      Publish
    </Button>
  )

  return (
    <HtmlEditor
      options={options}
      value={content.body}
      autoFocus
      placeholder="Start typing…"
      onChange={update}
      render={({ editor, state, dispatch }) => (
        <div className={classes.root}>
          <div className={classes.editor}>
            {editor}
          </div>

          <div className={classes.menu}>
            <MenuBar menu={menu} state={state} dispatch={dispatch}>
              <SubmitButton/>
            </MenuBar>
          </div>
        </div>
      )}
    />
  )
}

export default compose(
  // load the user id from the store
  connect(state => access(state, {
    uid: ['auth', 'uid']
  })),


  // get the id from the router
  withProps(props => ({
    id: props.match.params.id,
  })),

  // fetch the metadata and content from the database into the store
  subscribe(({ uid, id }) => [
    `/private/${uid}/metadata/${id}`,
    `/private/${uid}/content/${id}`,
  ]),

  // load the metadata and content from the store
  connect((state, { uid, id }) => access(state, {
    metadata: ['data', 'private', uid, 'metadata', id],
    content: ['data', 'private', uid, 'content', id],
  })),

  // write to the database on events
  withHandlers({ publish, update }),

  // fill the page
  withStyles(styles, { name: 'Edit' }),
)(Edit)
