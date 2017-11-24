import React from 'react'
import { List, withStyles } from 'material-ui'
import Item from './Item'

const ItemList = ({ classes, items, openMenu }) => (
  <List className={classes.list}>
    {items.length && items.map(item => (
      <Item key={item.key} id={item.key} item={item.value} openMenu={openMenu}/>
    ))}
  </List>
)

export default withStyles({
  list: {
    maxWidth: '50em'
  }
})(ItemList)
