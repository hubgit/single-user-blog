import React from 'react'
import { compose } from 'recompose'
import List from 'material-ui/List'
import withStyles from 'material-ui/styles/withStyles'
import Item from './Item'

const ItemList = ({ classes, items }) => (
  <div className={classes.list}>
    <List>
      {Object.keys(items).filter(key => items[key]).reverse().map(key => (
        <Item key={key} id={key} item={items[key]}/>
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
