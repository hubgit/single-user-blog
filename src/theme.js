import createMuiTheme from 'material-ui/styles/createMuiTheme'

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
    },
    Editor: {
      editor: {
        boxSizing: 'border-box',
        paddingLeft: 48,
        paddingRight: 48,
        paddingBottom: 48,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        lineHeight: 1.5,
        cursor: 'text',
        width: '80ch',
        maxWidth: '100%',
        overflowX: 'hidden',
        fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
        textRendering: 'optimizeLegibility',
        '-webkitFontSmoothing': 'antialiased',
        mozOsxFontSmoothing: 'grayscale',
        mozFontFeatureSettings: '"liga" on',
        color: 'rgba(0, 0, 0, 0.8)',
        '&:focus': {
          outline: 'none',
        },
        '& img': {
          maxWidth: '100%',
          overflowX: 'auto',
          height: 'auto',
        },
        '& blockquote': {
          borderLeft: '5px solid #ddd',
          marginLeft: 0,
          paddingLeft: '1em',
        },
        '& pre': {
          backgroundColor: '#eee',
          padding: '1em',
          whiteSpace: 'pre-wrap',
        },
        '& h1': {
          fontSize: 40,
          lineHeight: 1,
          letterSpacing: '-0.03em',
        },
        '& h2': {
          fontSize: 32,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        },
      },
    },
  },
})
