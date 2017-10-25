import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/Menu/MenuItem'
import { closeMenu } from '../menu'
import { unpublish, remove } from '../db'

const Actions = ({ menu, closeMenu, remove, unpublish }) => (
  <Menu open={menu.open} anchorEl={menu.anchor} onRequestClose={closeMenu}>
    {menu.item && menu.item.published && (
      <MenuItem onClick={unpublish}>Unpublish</MenuItem>
    )}
    <MenuItem onClick={remove}>Delete</MenuItem>
  </Menu>
)

export default compose(
  connect(state => ({
    menu: state.menu
  }), {
    closeMenu
  }),

  withHandlers({ remove, unpublish })
)(Actions)
