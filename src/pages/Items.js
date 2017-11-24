import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { LinearProgress, withStyles } from 'material-ui'
import { subscribe, isEmpty, isLoaded, access } from '../db'
import styles from './Items.style'

import Create from '../components/Create'
import ItemList from '../components/ItemList'
import Actions from '../components/Actions'

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
  // load the user id from the store
  connect(state => access(state, {
    uid: ['auth', 'uid']
  })),

  // fetch the list of metadata from the database into the store
  subscribe(({ uid }) => [{
    path: `/private/${uid}/metadata`,
    queryParams: ['orderByChild=created'], // TODO: descending
  }]),

  // load the list of items from the store
  connect((state, { uid }) => access(state, {
    items: ['ordered', 'private', uid, 'metadata']
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

  withStyles(styles, { name: 'Items' })
)(Items)
