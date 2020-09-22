import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import Modal from 'react-modal'
import {Block, Text, Header, Button, Select, Option} from './base-components'
import {getContinents} from './fetch-data'

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
      <GenerateNewGroupForm />
    </Modal>
  )
}

class GenerateNewGroupForm extends Component {
  state = {
    continents       : [],
    continentsLoaded : false,
    selectedContinent: '28HX8qDZHw'
  }

  componentDidMount () {
    this.setState({continentsLoaded:false})

    console.log('getting continents')
    getContinents().then(
      response => {
        this.setState({
          continentsLoaded: true,
          continents      : response.results
        })
      }
    )
  }

  render () {

    console.log(this.state)

    if (!this.state.continentsLoaded) {
      return (
        <Text>
          Loading ...
        </Text>
      )
    } else {
      return (
        <Select
          name='continent'
          label='Select continent:'
          value={this.state.selectedContinent}
          onChange={this.selectContinent}
        >
          <Option
            value=''
            name='Please select a continent'
          />

          {[...this.options]}
        </Select>
      )
    }
  }

  selectContinent = event => {

    console.log('selectContinent', event.target.value)

    this.setState({selectedContinent:event.target.value})
  }

  get options () {
    return this.optionsGenerator()
  }

  * optionsGenerator () {
    for (const continent of this.state.continents) {

      console.log('generating continent options', continent.objectId, continent.name)

      yield (
        <Option
          key={continent.objectId}
          value={continent.objectId}
          name={continent.name}
        />
      )
    }
  }
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
