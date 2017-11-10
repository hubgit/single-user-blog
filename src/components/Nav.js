import React from 'react'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { AppBar, Icon, Toolbar, Tooltip, withStyles } from 'material-ui'
import Auth from './Auth'

const Nav = ({ children, classes }) => (
  <AppBar position="static" color="inherit">
    <Toolbar>
      <Tooltip title="Home" placement="right">
        <Link to="/" className={classes.link}>
          <Icon>home</Icon>
        </Link>
      </Tooltip>

      <Auth/>
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
