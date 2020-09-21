import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import Modal from 'react-modal'
import {Block, Text, Header, Button} from './base-components'

Modal.setAppElement('#root')


@hot(module)
export default class App extends Component {
  state = {
    modalOpen: false
  }

  render () {
    return (
      <Block style={styles.root}>
        <PageHead />

        <AddGroupButton addGroup={this.addGroup} />

        <AddGroupModal
          modalOpen={this.state.modalOpen}
          closeModal={this.closeModal}
        />
      </Block>
    )
  }

  addGroup = () => {
    console.log('starting add group process')

    this.setState({modalOpen:true})
  }

  closeModal = () => {
    this.setState({modalOpen:false})
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

function AddGroupButton (props) {
  return (
    <Block style={styles.buttonBlock} onClick={props.addGroup}>
      <Button text='+' />

      <Text>
        New Group
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
      style={styles.addGroupModal}
    >
      <Text>
        Select continent:
      </Text>
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
    display        : 'inline-flex',
    border         : 'solid',
    borderWidth    : '5px',
    padding        : '10px',
    backgroundColor: 'red',
    flexDirection  : 'column',
    alignItems     : 'flex-start'
  },
  buttonBlock: {
    flexDirection: 'row'
  },
  addGroupModal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      top   : '10vh',
      bottom: '10vh',
      left  : '10vw',
      right : '10vw',
      border: '0px'
    }
  }
}
