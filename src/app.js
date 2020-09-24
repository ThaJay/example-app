import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import Modal from 'react-modal'
import {Block, Text, Header, AddButtonWithLabel} from './base-components'
import {GenerateNewGroupForm} from './generate-new-group-form'

Modal.setAppElement('#root')


@hot(module)
export default class App extends Component {
  state = {modalOpen:false}

  render () {
    return (
      <Block style={styles.root}>
        <PageHead />

        <AddButtonWithLabel
          ButtonLabel='New Group'
          onClick={this.addGroup}
        />

        <AddGroupModal
          modalOpen={this.state.modalOpen}
          closeModal={this.closeModal}
        />
      </Block>
    )
  }

  addGroup = () => {
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

function AddGroupModal (props) {
  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={props.closeModal}
      contentLabel='Example Modal'
      style={styles.addGroupModal}
    >
      <GenerateNewGroupForm />
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
