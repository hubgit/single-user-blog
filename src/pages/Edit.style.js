export default {
  root: {
    position: 'fixed',
    top: 48,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  editor: {
    flex: 1,
    overflowY: 'auto',
    width: '80ch',
    marginBottom: 10,
    boxSizing: 'border-box',
    paddingLeft: 48,
    paddingRight: 48,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    lineHeight: 1.5,
    cursor: 'text',
    maxWidth: '100%',
    overflowX: 'hidden',
    fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
    textRendering: 'optimizeLegibility',
    '-webkitFontSmoothing': 'antialiased',
    mozOsxFontSmoothing: 'grayscale',
    mozFontFeatureSettings: '"liga" on',
    color: 'rgba(0, 0, 0, 0.8)',
    // '& ::selection': {
    //   background: '#84cef4'
    // },
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
  }
}