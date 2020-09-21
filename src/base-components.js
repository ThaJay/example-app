import React from 'react'


export function Block (props) {
  return (
    <div
      {...props}
      style={{...styles.block, ...props.style}}
    />
  )
}

export function Text (props) {
  return (
    <span
      {...props}
      style={{...styles.text, ...props.style}}
    />
  )
}

export function Header (props) {
  return (
    <Text
      {...props}
      style={{...styles.header, ...props.style}}
    />
  )
}

const styles = {
  block: {
    display      : 'flex',
    flexShrink   : 1,
    flexDirection: 'column'
  },
  text: {
    flexShrink     : 1,
    display        : 'flex',
    backgroundColor: 'green'
  },
  header: {
    fontSize        : 24,
    marginHorizontal: 12,
    marginTop       : 0
    // marginBotom     : 12,
    // marginHorizontal: 12
  }
}
