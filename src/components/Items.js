import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/Progress/LinearProgress'
import withStyles from 'material-ui/styles/withStyles'
import { subscribe, isEmpty, isLoaded, access } from '../db'

import Create from './Create'
import ItemList from './ItemList'
import Actions from './Actions'

const Items = ({ classes, items }) => {
  if (!isLoaded(items)) return (
    <LinearProgress />
  )

  return (
    <div>
      <div className={classes.main}>
        {isEmpty(items) ? (
          <div className={classes.intro}>Welcome</div>
        ) : (
          <ItemList items={items}/>
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
  subscribe([`private/metadata#orderByChild=created`]),

  // load the list of items from the store
  connect(state => access(state, {
    items: ['data', 'private', 'metadata']
  })),

  withStyles(theme => ({
    main: {
      display: 'flex',
      justifyContent: 'center',
    },
    intro: {
      padding: 100,
    },
    create: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
  }), {
    name: 'Items'
  })
)(Items)
