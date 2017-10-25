import React from 'react'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText, withStyles } from 'material-ui'

const Metadata = ({ item }) => (
  <span>
    <span>
      {item.published ? 'Published ' : 'Created '}
    </span>

    <Moment format="YYYY-MM-DD">
      {item.published || item.created}
    </Moment>
  </span>
)

const Item = ({ classes, id, item, openMenu }) => (
  <ListItem button to={`/edit/${id}`} component={Link}>
    <ListItemText primary={item.title} secondary={<Metadata item={item}/>} />

    <ListItemSecondaryAction>
      <IconButton
        color="inherit"
        className={classes.more}
        onClick={event => {
          event.preventDefault()
          openMenu(id, item, event.target)
        }}>
        more_vert
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default compose(
  withStyles({
    more: {
      '&:hover': {
        color: 'cornflowerblue',
      },
    },
  }, {
    name: 'Item'
  })
)(Item)
