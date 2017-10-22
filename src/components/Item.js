import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { withStyles, IconButton, ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui'
import Moment from 'react-moment'
import { openMenu } from '../menu'

const Item = ({ classes, id, item, openMenu }) => (
  <ListItem
    button
    to={`/edit/${id}`}
    component={Link}>
    <ListItemText
      primary={item.title}
      secondary={
        <span>
          <span>
            {item.published ? 'Published ' : 'Created '}
          </span>

          <Moment format="YYYY-MM-DD">
            {item.published || item.created}
           </Moment>
        </span>
      }
    />

    <ListItemSecondaryAction>
      <IconButton
        color="inherit"
        onClick={openMenu}
        className={classes.iconButton}
      >
        more_vert
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default compose(
  connect(null, (dispatch, { id, item }) => ({
    openMenu: event => {
      event.preventDefault()
      const anchor = event.target
      dispatch(openMenu({ id, item, anchor }))
    }
  })),

  withStyles({
    iconButton: {
      '&:hover': {
        color: 'cornflowerblue',
      },
    },
  })
)(Item)
