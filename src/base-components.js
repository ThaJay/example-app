import React from 'react'

// no extra rerender when there is no style prop
function mergeStyles (componentStyle, propStyle) {
  if (propStyle) return {...componentStyle, ...propStyle}
  else return componentStyle
}

export function Block (props) {
  return (
    <div
      {...props}
      style={mergeStyles(styles.block, props.style)}
    />
  )
}

export function Text (props) {
  return (
    <span
      {...props}
      style={mergeStyles(styles.text, props.style)}
    />
  )
}

export function Header (props) {
  return (
    <Text
      {...props}
      style={mergeStyles(styles.header, props.style)}
    />
  )
}

export function Loading (props) {
  return (
    <Text>
      Loading {props.name}...
    </Text>
  )
}

export function Button (props) {
  return (
    <Block
      {...props}
      style={mergeStyles(styles.button, props.style)}
    >
      <Text style={styles.buttonText}>
        {props.text}
      </Text>
    </Block>
  )
}

export function AddButtonWithLabel (props) {
  return (
    <Block style={styles.buttonBlock} onClick={props.onClick}>
      <Button text='+' />

      <Text>
        {props.ButtonLabel}
      </Text>
    </Block>
  )

}

export function Option (props) {
  return (
    <option {...props}>
      {props.name}
    </option>
  )
}

export function Select (props) {
  const {name, label, children, ...rest} = props

  return (
    <Block>
      <label htmlFor={name}>
        {label}
      </label>

      <select {...rest}>
        {children}
      </select>
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
    ...baseStyle // happens on parse so no mutations that would cause a rerender
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
  },
  buttonText: {
    fontSize: 36
  }
}
