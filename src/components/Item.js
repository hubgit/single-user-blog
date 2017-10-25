import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import ListItem from 'material-ui/List/ListItem'
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction'
import ListItemText from 'material-ui/List/ListItemText'
import withStyles from 'material-ui/styles/withStyles'
import Moment from 'react-moment'
import { openMenu } from '../menu'

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
      <IconButton color="inherit" className={classes.more} onClick={openMenu}>
        more_vert
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default compose(
  connect(null, (dispatch, { id, item }) => ({
    openMenu: event => {
      event.preventDefault()
      dispatch(openMenu({ id, item, anchor: event.target }))
    }
  })),

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
