import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles, AppBar, Icon, Toolbar, Tooltip } from 'material-ui'

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

export default withStyles({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'inline-block',
    '&:hover': {
      color: 'cornflowerblue',
    },
  },
})(Nav)
