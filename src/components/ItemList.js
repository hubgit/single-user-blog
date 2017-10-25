import React from 'react'
import { compose } from 'recompose'
import { List, withStyles } from 'material-ui'
import Item from './Item'

const ItemList = ({ classes, items, openMenu }) => (
  <div className={classes.list}>
    <List>
      {items.map(item => (
        <Item key={item.key} id={item.key} item={item.value} openMenu={openMenu}/>
      ))}
    </List>
  </div>
)

export default compose(
  withStyles(theme => ({
    list: {
      width: '50em',
    },
  }), {
    name: 'Items'
  })
)(ItemList)
