import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { LinearProgress, withStyles } from 'material-ui'
import { subscribe, isEmpty, isLoaded, access } from '../db'

import Create from './Create'
import ItemList from './ItemList'
import Actions from './Actions'

const Items = ({ classes, items, menu, openMenu, closeMenu }) => {
  if (!isLoaded(items)) return (
    <LinearProgress />
  )

  return (
    <div>
      <div className={classes.main}>
        {isEmpty(items) ? (
          <div className={classes.intro}>Welcome</div>
        ) : (
          <ItemList items={items} openMenu={openMenu}/>
        )}
      </div>

      <Actions menu={menu} closeMenu={closeMenu}/>

      <div className={classes.create}>
        <Create/>
      </div>
    </div>
  )
}

export default compose(
  // fetch the list of metadata from the database into the store
  subscribe([{
    path: 'private/metadata',
    queryParams: ['orderByChild=created'], // TODO: descending
  }]),

  // load the list of items from the store
  connect(state => access(state, {
    items: ['ordered', 'private', 'metadata']
  })),

  withState('menu', 'setMenu', { open: false }),

  withHandlers({
    openMenu: ({ setMenu }) => (id, item, anchor) => {
      setMenu({ open: true, id, item, anchor })
    },
    closeMenu: ({ setMenu }) => () => {
      setMenu({ open: false })
    },
  }),

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
