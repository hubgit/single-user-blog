import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Icon, Toolbar, Tooltip, withStyles } from 'material-ui'
import Auth from './Auth'

const Nav = ({ classes, children }) => (
  <AppBar position="static" color="inherit">
    <Toolbar>
      <Tooltip title="Home" placement="right">
        <Link className={classes.link} to="/">
          <Icon>home</Icon>
        </Link>
      </Tooltip>

      <Auth/>
    </Toolbar>
  </AppBar>
)

export default withStyles({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      color: 'cornflowerblue'
    }
  }
})(Nav)
