import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import Modal from 'react-modal'
import {Block, Text, Header, AddButtonWithLabel, baseStyle} from './base-components'
import {GenerateNewGroupForm} from './generate-new-group-form'

Modal.setAppElement('#root')


@hot(module)
export default class App extends Component {
  state = {
    addGroupModalOpen    : false,
    sets                 : {},
    selectedGroup        : '',
    groupDetailsModalOpen: false
  }

  render () {
    return (
      <Block style={styles.root}>
        <Block style={styles.child}>
          <PageHead />

          <GroupList
            sets={this.state.sets}
            onClick={this.openGroupDetails}
          />

          <AddButtonWithLabel
            ButtonLabel='New Set'
            onClick={this.openAddGroupModal}
          />

          <AddGroupModal
            modalOpen={this.state.addGroupModalOpen}
            closeModal={this.closeAddGroupModal}
            addGroup={this.addGroup}
          />

          <GroupDetailsModal
            modalOpen={this.state.groupDetailsModalOpen}
            closeModal={this.closeGroupDetailsModal}
            group={this.state.sets[this.state.selectedGroup]}
          />
        </Block>
      </Block>
    )
  }

  openGroupDetails = name => {
    this.setState({
      groupDetailsModalOpen: true,
      selectedGroup        : name
    })
  }

  openAddGroupModal = () => {
    this.setState({addGroupModalOpen:true})
  }

  closeAddGroupModal = () => {
    this.setState({addGroupModalOpen:false})
  }

  closeGroupDetailsModal = () => {
    this.setState({groupDetailsModalOpen:false})
  }

  addGroup = (name, data) => {
    this.closeAddGroupModal()

    this.setState({
      sets: {
        ...this.state.sets,
        [name]: data
      }
    })
  }
}


function PageHead (props) {
  return (
    <Block style={styles.child}>
      <Header>
        Sets of postal codes
      </Header>

      <Text>
        Choose a continent, country and set size to generate a set of postal codes.
      </Text>
    </Block>
  )
}

function GroupList (props) {
  return (
    <Block style={styles.child}>
      <Header>
        Generated sets:
      </Header>

      <Block style={styles.groupList}>
        {getListItems(props)}
      </Block>
    </Block>
  )
}

function getListItems (props) {
  if (Object.keys(props.sets).length) return [...groupListItems(props)]
  else return <ListItem text='No sets generated yet' />
}

function * groupListItems (props) {
  for (const i in props.sets) {
    yield (
      <ListItem
        key={i}
        text={i}
        onClick={() => props.onClick(i)}
      />
    )
  }
}

function ListItem (props) {
  return (
    <Block
      style={styles.listItem.block}
      onClick={props.onClick}
    >
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
      contentLabel='Add Group'
      style={styles.modal}
    >
      <GenerateNewGroupForm addGroup={props.addGroup} />
    </Modal>
  )
}

function GroupDetailsModal (props) {
  const {modalOpen, closeModal, ...rest} = props
  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={props.closeModal}
      contentLabel='Group Details'
      style={styles.modal}
    >
      <GroupDetails {...rest} />
    </Modal>
  )
}

function GroupDetails (props) {
  return (
    <article>
      {JSON.stringify(props, null, '\n')}
    </article>
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
      width          : '100%',
      borderBottom   : '1px solid black',
      backgroundColor: 'lightgrey'
    },
    text: {
      marginTop   : 5,
      marginRight : 10,
      marginBottom: 5,
      marginLeft  : 10
    }
  }
}
