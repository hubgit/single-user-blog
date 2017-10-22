import React from 'react'
import get from 'lodash/get'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { withStyles, LinearProgress, List } from 'material-ui'
import Create from './Create'
import Item from './Item'
import Actions from './Actions'

const Items = ({ classes, items }) => {
  if (!isLoaded(items)) return <LinearProgress />

  return (
    <div>
      <div className={classes.main}>
        {isEmpty(items) ? (
          <div className={classes.intro}>Welcome</div>
        ) : (
          <div className={classes.list}>
            <List>
              {Object.keys(items).filter(key => items[key]).reverse().map(key => (
                <Item key={key} id={key} item={items[key]}/>
              ))}
            </List>
          </div>
        )}
      </div>

      <Actions/>

      <div className={classes.create}>
        <Create/>
      </div>
    </div>
  )
}

export default compose(
  // fetch the list of metadata from the database into the store
  firebaseConnect([`/private/metadata#orderByChild=created`]),

  // load the list of items from the store
  connect(state => ({
    items: get(state.firebase.data, `private.metadata`),
  })),

  withStyles(theme => ({
    main: {
      display: 'flex',
      justifyContent: 'center',
    },
    list: {
      width: '50em',
    },
    intro: {
      padding: 100,
    },
    create: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
  }))
)(Items)
