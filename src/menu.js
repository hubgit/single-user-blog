export const MENU_OPEN = 'menu-open'
export const MENU_CLOSE = 'menu-close'

export const openMenu = payload => ({
  type: MENU_OPEN,
  payload
})

export const closeMenu = () => ({
  type: MENU_CLOSE,
})

const initialState = {
  open: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return {
        open: true,
        ...action.payload
      }

    case MENU_CLOSE:
      return {
        open: false
      }

    default:
      return state
  }
}
