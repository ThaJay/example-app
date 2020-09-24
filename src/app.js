import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import Modal from 'react-modal'
import {Block, Text, Header, AddButtonWithLabel, baseStyle} from './base-components'
import {GenerateNewGroupForm} from './generate-new-group-form'

Modal.setAppElement('#root')


@hot(module)
export default class App extends Component {
  state = {
    modalOpen: false,
    groups   : {}
  }

  render () {
    return (
      <Block style={styles.root}>
        <Block style={styles.child}>
          <PageHead />

          <GroupList groups={this.state.groups} />

          <AddButtonWithLabel
            ButtonLabel='New Group'
            onClick={this.openAddGroupModal}
          />

          <AddGroupModal
            modalOpen={this.state.modalOpen}
            closeModal={this.closeAddGroupModal}
            addGroup={this.addGroup}
          />
        </Block>
      </Block>
    )
  }

  openAddGroupModal = () => {
    this.setState({modalOpen:true})
  }

  closeAddGroupModal = () => {
    this.setState({modalOpen:false})
  }

  addGroup = (name, data) => {
    this.setState({
      groups: {
        ...this.state.groups,
        [name]: data
      }
    })
  }
}


function PageHead (props) {
  return (
    <Block style={styles.child}>
      <Header>
        Groups of Fake People
      </Header>

      <Text>
        Choose a continent, country and group size to generate a group of random people.
      </Text>

      <Text>
        Search and filter names.
      </Text>

      <Text>
        View person details
      </Text>
    </Block>
  )
}

function GroupList (props) {
  return (
    <Block style={styles.child}>
      <Header>
        Generated groups:
      </Header>

      <Block style={styles.groupList}>
        {getListItems(props.groups)}
      </Block>
    </Block>
  )
}

function getListItems (groups) {
  if (Object.keys(groups).length) return [...groupListItems(groups)]
  else return <ListItem text='No groups generated yet' />
}

function * groupListItems (groups) {
  for (const i in groups) {
    yield (
      <ListItem
        key={i}
        text={i}
      />
    )
  }
}

function ListItem (props) {
  return (
    <Block style={styles.listItem.block}>
      <Text style={styles.listItem.text}>
        {props.text}
      </Text>
    </Block>
  )
}

function AddGroupModal (props) {
  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={props.closeModal}
      contentLabel='Example Modal'
      style={styles.modal}
    >
      <GenerateNewGroupForm addGroup={props.addGroup} />
    </Modal>
  )
}


const styles = {
  root: {
    height         : '100vh',
    width          : '100vw',
    backgroundColor: 'beige'
  },
  child: {
    display   : 'inline-flex',
    padding   : '10px',
    alignItems: 'flex-start'
  },
  modal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      ...baseStyle,
      justifyContent: 'start',
      width         : 'auto',
      top           : '10vh',
      bottom        : '10vh',
      left          : '10vw',
      right         : '10vw',
      border        : '0px'
    }
  },
  groupList: {
    borderTop: '1px solid black'
  },
  listItem: {
    block: {
      borderBottom: '1px solid black'
    },
    text: {
      marginTop   : 5,
      marginRight : 10,
      marginBottom: 5,
      marginLeft  : 10
    }
  }
}
