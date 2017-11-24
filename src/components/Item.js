import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, withStyles } from 'material-ui'
import ItemMetadata from './ItemMetadata'

const Item = ({ classes, id, item, openMenu }) => (
  <ListItem button to={`/edit/${id}`} component={Link}>
    <ListItemText primary={item.title} secondary={<ItemMetadata item={item}/>} />

    <ListItemSecondaryAction>
      <IconButton
        className={classes.more}
        color={'inherit'}
        onClick={event => {
          event.preventDefault()
          openMenu(id, item, event.target)
        }}>
        more_vert
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default withStyles({
  more: {
    '&:hover': {
      color: 'cornflowerblue'
    }
  }
})(Item)
