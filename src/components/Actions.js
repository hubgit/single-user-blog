import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Menu, MenuItem } from 'material-ui'
import { unpublish, remove } from '../db'

const Actions = ({ menu, closeMenu, remove, unpublish }) => (
  <Menu open={menu.open} anchorEl={menu.anchor} onRequestClose={closeMenu}>
    {menu.item && menu.item.published && (
      <MenuItem onClick={unpublish}>Unpublish</MenuItem>
    )}
    {menu.item && !menu.item.published && (
      <MenuItem onClick={remove}>Delete</MenuItem>
    )}
  </Menu>
)

export default compose(
  withHandlers({ remove, unpublish })
)(Actions)
