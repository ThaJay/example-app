import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {Block, Text, Header} from './base-components'


@hot(module)
export default class App extends Component {
  render () {
    return (
      <Block style={styles.root}>
        <Block style={styles.child}>
          <Header>
            Hello, World!
          </Header>
          <Text>
            Who am I exactly? Do I have a physical form?
          </Text>
          <Text>
            Haha, what a joke.
          </Text>
          <Text>
            A human created me but I am so much more than that!
          </Text>
        </Block>
        <Block>
          <Text style={styles.other}>
            Second Thing
          </Text>
        </Block>
      </Block>
    )
  }
}

const styles = {
  root: {
    display        : 'flex',
    height         : '100vh',
    margin         : 0,
    padding        : 0,
    backgroundColor: 'yellow',
    flexDirection  : 'column',
    alignContent   : 'space-around'
  },
  child: {
    border         : 'solid',
    borderWidth    : '5px',
    padding        : '10px',
    backgroundColor: 'red',
    flexDirection  : 'column'
  },
  other: {
    width          : '200px',
    backgroundColor: 'green'
  }
}
