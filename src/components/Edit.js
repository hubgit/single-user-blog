import React from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { compose, withProps, withHandlers } from 'recompose'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { withStyles, LinearProgress } from 'material-ui'
import Editor from './Editor'

const canPublish = post => {
  if (!post.title) return false
  if (!post.lastPublished) return true
  if (!post.published) return true
  return post.updated > post.lastPublished
}

const Edit = ({ classes, content, publish, save }) => {
  if (!isLoaded(content)) return <LinearProgress />

  if (isEmpty(content)) return <div>Not found</div>

  return (
    <div className={classes.editor}>
      <Editor
        value={content.body}
        onChange={save}
        canPublish={canPublish(content)}
        publish={publish}
      />
    </div>
  )
}

export default compose(
  // get the id from the router
  withProps(props => ({
    id: props.match.params.id,
  })),

  // fetch the content from the database into the store
  firebaseConnect(({ id }) => [`/private/content/${id}`]),

  // load the metadata and content from the store
  connect((state, { id }) => ({
    content: get(state.firebase.data, `private.content.${id}`),
  })),

  // write to the database on events
  withHandlers({
    save: ({ firebase, id }) => async ({ body }) => {
      const parser = new DOMParser()

      const doc = parser.parseFromString(body, 'text/html')
      const h1 = doc.querySelector('h1')
      const title = h1 ? h1.textContent : null

      const updated = firebase.database.ServerValue.TIMESTAMP

      // TODO: transaction?

      await Promise.all([
        firebase.update(`/private/content/${id}`, {
          body
        }),
        firebase.update(`/private/metadata/${id}`, {
          title,
          updated
        }),
      ])
    },
    publish: ({ firebase, id }) => async () => {
      const load = path =>
        firebase.ref(path).once('value').then(snapshot => snapshot.val())

      const metadata = await load(`/private/metadata/${id}`)
      const content = await load(`/private/content/${id}`)

      const updated = firebase.database.ServerValue.TIMESTAMP
      const published = metadata.published || updated

      // TODO: transaction?
      await Promise.all([
        firebase.set(`/public/content/${id}`, {
          ...content
        }),
        firebase.set(`/public/metadata/${id}`, {
          ...metadata,
          published,
          updated
        }),
        firebase.update(`/private/metadata/${id}`, {
          published,
          lastPublished: updated,
        }),
      ])
    },
  }),

  withStyles({
    editor: {
      position: 'fixed',
      top: 48,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
  })
)(Edit)
