import { createMuiTheme } from 'material-ui'

export default createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        gridRow: 'header',
        background: 'transparent',
      }
    },
    MuiAvatar: {
      root: {
        width: 24,
        height: 24,
      },
    },
    MuiToolbar: {
      root: {
        '@media (min-width: 0px)': {
          justifyContent: 'space-between',
          minHeight: 48,
        }
      }
    }
  },
})
