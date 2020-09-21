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

export function Button (props) {
  return (
    <Block
      {...props}
      style={{...styles.button, ...props.style}}
    >
      <Text style={{fontSize:36}}>
        {props.text}
      </Text>
    </Block>
  )
}

const baseStyle =  {
  display       : 'flex',
  flexDirection : 'column',
  flexGrow      : 0,
  flexShrink    : 1,
  flexBasis     : '10px',
  width         : 'max-content',
  justifyContent: 'space-around',
  alignItems    : 'center',
  alignContent  : 'space-around'
}

const styles = {
  block: {
    ...baseStyle
  },
  text: {
    ...baseStyle,
    // backgroundColor: 'lightgreen',
    padding: 5
  },
  header: {
    fontSize: 24,
    margin  : 10
  },
  button: {
    border         : 'solid',
    borderRadius   : 20,
    borderColor    : 'blue',
    backgroundColor: 'blue',
    color          : 'white',
    paddingTop     : 10,
    paddingBottom  : 10,
    paddingLeft    : 20,
    paddingRight   : 20
  }
}
