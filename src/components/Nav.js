import React from 'react'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Icon from 'material-ui/Icon'
import Toolbar from 'material-ui/Toolbar'
import Tooltip from 'material-ui/Tooltip'
import withStyles from 'material-ui/styles/withStyles'

const Nav = ({ children, classes }) => (
  <AppBar position="static" color="inherit">
    <Toolbar>
      <Tooltip title="Home" placement="right">
        <Link to="/" className={classes.link}>
          <Icon>home</Icon>
        </Link>
      </Tooltip>

      {children}
    </Toolbar>
  </AppBar>
)

export default compose(
  withStyles({
    link: {
      color: 'inherit',
      textDecoration: 'none',
      display: 'inline-block',
      '&:hover': {
        color: 'cornflowerblue',
      },
    },
  }, {
    name: 'Nav'
  })
)(Nav)
