
import React from 'react'

const Input = (props) => {
const placeholder  = props.placeholder;
const handleInput = props.handleInput;
const name = props.name;

  return (
    <div>
        <input name={name} onChange={handleInput} placeholder={placeholder}/>
    </div>
  )
}

export default Input