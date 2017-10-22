import React from 'react'
import classnames from 'classnames'
import { compose, withProps } from 'recompose'
import debounce from 'lodash/debounce'
import filter from 'lodash/filter'
import {
  IconButton,
  Select,
  MenuItem,
  Toolbar,
  Tooltip,
  FormControl,
  Button,
  withStyles,
} from 'material-ui'

const exec = (command, value = null) => {
  document.execCommand(command, false, value)
}

const state = command => {
  return document.queryCommandState(command)
}

const buildContainers = node => {
  const result = {}

  if (node.nodeType === 3) {
    node = node.parentNode
  }

  while (node && node.tagName) {
    result[node.tagName] = true
    node = node.parentNode
  }

  return result
}

// const isEmptyBlock = node => node
//   && node.nodeType === 1
//   && node.tagName === 'P'
//   && !node.textContent.length

class Editor extends React.Component {
  state = {
    selectedBlock: null,
    selectionType: 'None',
    active: {},
    containers: {},
  }

  constructor(props) {
    super(props)

    // TODO: move to `commands` or 'toolbar'?
    exec('DefaultParagraphSeparator', 'p')

    this.handleChange = debounce(this.notifyChange, 1000, { maxWait: 5000 })
  }

  componentDidMount() {
    this.editor.innerHTML = this.props.value

    document.addEventListener('selectionchange', this.handleSelectionChange)
    document.addEventListener('keyup', this.handleSelectionChange) // for cmd-b
    document.addEventListener('mouseup', this.handleSelectionChange)
  }

  handleSelectionChange = () => {
    const props = this.props
    const selection = document.getSelection()

    if (selection.anchorNode) {
      const containers = buildContainers(selection.anchorNode)

      const active = props.toolbar.reduce((result, action) => {
        if (action.state && action.state(containers)) {
          result[action.key] = true
        }

        return result
      }, {})

      const selectedBlock = props.toolbar.find(action => {
        return action.group === 'block' && active[action.key]
      })

      this.setState({
        selectionType: selection.type,
        selectedBlock: selectedBlock ? selectedBlock.key : null,
        active,
        containers,
      })
    } else {
      this.setState({
        selectionType: selection.type,
        selectedBlock: null,
        active: {},
        containers: {},
      })
    }
  }

  notifyChange = async () => {
    // TODO: prevent unload while saving

    // props.setSaving(true)
    await this.props.onChange({
      body: this.editor.innerHTML,
    })
    // props.setSaving(false)
  }

  handleAction = action => event => {
    event.preventDefault()
    action.result(this)
  }

  setBlockType = event => {
    const key = event.target.value
    this.props.toolbar.find(action => action.key === key).result()
  }

  render() {
    const { classes, toolbar, canPublish, publish } = this.props
    const { active, selectedBlock, selectionType } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div
            className={classes.editor}
            contentEditable
            autoFocus
            onInput={this.handleChange}
            ref={node => {
              this.editor = node
            }}
          />
        </div>

        <Toolbar className={classes.toolbar} disableGutters>
          {/*<FormControl>
            <div>
              <Tooltip title="Save" placement="top">
                <IconButton
                  className={classes.button}
                  onClick={this.handleChange}>
                  save
                </IconButton>
              </Tooltip>
            </div>
            <FormHelperText>Save</FormHelperText>
          </FormControl>*/}

          <Button
            color="primary"
            raised
            disabled={!canPublish}
            onClick={publish}
          >
            Publish
          </Button>

          <FormControl>
            <div>
              {filter(toolbar, { group: 'format' }).map(action => (
                <Tooltip title={action.title} placement="top" key={action.key}>
                  <IconButton
                    className={classnames(classes.button, {
                      [classes.active]: active[action.key],
                    })}
                    onMouseDown={this.handleAction(action)}
                    disabled={!['Range', 'Caret'].includes(selectionType)}
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
            {/*<FormHelperText>Format</FormHelperText>*/}
          </FormControl>

          <FormControl>
            <div>
              {filter(toolbar, { group: 'insert' }).map(action => (
                <Tooltip title={action.title} placement="top" key={action.key}>
                  <IconButton
                    className={classes.button}
                    onMouseDown={this.handleAction(action)}
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </div>
            {/*<FormHelperText>Insert</FormHelperText>*/}
          </FormControl>

          <FormControl className={classes.blockControl}>
            <Select value={selectedBlock || ''} onChange={this.setBlockType}>
              {filter(toolbar, { group: 'block' }).map(action => (
                <MenuItem key={action.key} value={action.key}>
                  {/*<Icon>{action.icon}</Icon>*/}
                  {action.title}
                </MenuItem>
              ))}
            </Select>
            {/*<FormHelperText>Block</FormHelperText>*/}
          </FormControl>
        </Toolbar>
      </div>
    )
  }
}

// TODO: ensure save on componentDidUnmount

export default compose(
  withProps({
    toolbar: [
      {
        key: 'italic',
        group: 'format',
        icon: 'format_italic',
        title: 'Italic',
        state: () => state('italic'),
        result: () => exec('italic'),
      },
      {
        key: 'bold',
        group: 'format',
        icon: 'format_bold',
        title: 'Bold',
        state: containers =>
          state('bold') && !containers['H1'] && !containers['H2'],
        result: () => exec('bold'),
      },
      // {
      //   key: 'underline',
      //   group: 'format',
      //   icon: 'format_underline',
      //   title: 'Underline',
      //   state: containers => state('underline') && !containers['A'],
      //   result: () => exec('underline')
      // },
      // {
      //   key: 'strikethrough',
      //   group: 'format',
      //   icon: 'format_strikethrough',
      //   title: 'Strike-through',
      //   state: () => state('strikeThrough'),
      //   result: () => exec('strikeThrough')
      // },
      {
        key: 'superscript',
        group: 'format',
        icon: (
          <span style={{ lineHeight: 0 }}>
            x<sup>2</sup>
          </span>
        ),
        title: 'Superscript',
        state: () => state('superscript'),
        result: () => exec('superscript'),
      },
      {
        key: 'subscript',
        group: 'format',
        icon: (
          <span style={{ lineHeight: 0 }}>
            x<sub>2</sub>
          </span>
        ),
        title: 'Subscript',
        state: () => state('subscript'),
        result: () => exec('subscript'),
      },
      {
        key: 'title',
        group: 'block',
        // icon: <b>H<sub>1</sub></b>,
        title: 'Title',
        state: containers => containers['H1'],
        result: () => exec('formatBlock', '<H1>'),
      },
      {
        key: 'heading',
        group: 'block',
        // icon: <b>H<sub>2</sub></b>,
        title: 'Heading',
        state: containers => containers['H2'],
        result: () => exec('formatBlock', '<H2>'),
      },
      {
        key: 'paragraph',
        group: 'block',
        // icon: '¶',
        title: 'Paragraph',
        state: containers => containers['P'],
        result: () => exec('formatBlock', '<P>'),
      },
      {
        key: 'quote',
        group: 'block',
        // icon: 'format_quote',
        title: 'Quote',
        state: containers => containers['BLOCKQUOTE'],
        result: () => exec('formatBlock', '<BLOCKQUOTE>'),
      },
      {
        key: 'code',
        group: 'block',
        // icon: 'code',
        title: 'Code',
        state: containers => containers['PRE'],
        result: () => exec('formatBlock', '<PRE>'),
      },
      {
        key: 'olist',
        group: 'insert',
        icon: 'format_list_numbered',
        title: 'Ordered List',
        state: containers => containers['OL'],
        result: () => exec('insertOrderedList'),
      },
      {
        key: 'ulist',
        group: 'insert',
        icon: 'format_list_bulleted',
        title: 'Unordered List',
        state: containers => containers['UL'],
        result: () => exec('insertUnorderedList'),
      },
      {
        key: 'link',
        group: 'insert',
        icon: 'insert_link',
        title: 'Link',
        state: containers => containers['A'],
        result: () => {
          const url = window.prompt('Enter the link URL')
          if (url) exec('createLink', url)
        },
      },
      {
        key: 'image',
        group: 'insert',
        icon: 'add_a_photo',
        title: 'Image',
        state: containers => containers['IMG'],
        result: () => {
          // TODO: figure
          const url = window.prompt('Enter the image URL')
          // if (url) exec('insertImage', url)
          if (url)
            exec(
              'insertHTML',
              `
                <figure>
                    <img src="${url}">
                    <figcaption>
                      <p>Caption</p>
                    </figcaption>
                </figure>
              `
            )
        },
      },
    ],
  }),
  withStyles({
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      flex: 1,
      overflowY: 'auto',
    },
    toolbar: {
      boxSizing: 'border-box',
      background: '#f6f6f6',
      display: 'flex',
      minHeight: 0,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 48,
      paddingRight: 48,
      // justifyContent: 'center',
      width: '80ch',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    blockControl: {
      minWidth: 120,
    },
    button: {
      height: 32,
      width: 32,
      borderRadius: 2,
      fontSize: 20,
      marginLeft: 5,
      marginRight: 5,
      '&:hover': {
        color: 'cornflowerblue',
      },
      '&:not(:last-child)': {
        marginRight: 10,
      },
    },
    active: {
      backgroundColor: 'lightgray',
    },
    editor: {
      boxSizing: 'border-box',
    },
  }, {
    name: 'Editor',
  })
)(Editor)
