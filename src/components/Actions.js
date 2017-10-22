import React from 'react'
import { Menu, MenuItem } from 'material-ui'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { closeMenu } from '../menu'

const Actions = ({ menu, closeMenu, unpublish, remove }) => (
  <Menu open={menu.open} anchorEl={menu.anchor} onRequestClose={closeMenu}>
    {menu.item && menu.item.published && (
      <MenuItem onClick={unpublish}>Unpublish</MenuItem>
    )}
    <MenuItem onClick={remove}>Delete</MenuItem>
  </Menu>
)

export default compose(
  firebaseConnect(),

  connect(state => ({
    menu: state.menu
  }), {
    closeMenu
  }),

  withHandlers({
    unpublish: ({ firebase, menu: { id }, closeMenu }) => async event => {
      event.preventDefault()

      await Promise.all([
        firebase.remove(`/public/content/${id}`),
        firebase.remove(`/public/metadata/${id}`),
      ])

      await firebase.update(`/private/metadata/${id}`, {
        published: null
      })

      closeMenu()
    },
    remove: ({ firebase, menu: { id }, closeMenu }) => async event => {
      event.preventDefault()

      // TODO: display a modal, or move to bin to allow undelete
      if (!window.confirm('Really delete this item?')) {
        return
      }

      // TODO: transaction?
      await Promise.all([
        firebase.remove(`/public/content/${id}`),
        firebase.remove(`/public/metadata/${id}`),
        firebase.remove(`/private/content/${id}`),
        firebase.remove(`/private/metadata/${id}`),
      ])

      closeMenu()
    }
  }),
)(Actions)
