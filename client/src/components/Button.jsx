import React from 'react';

function Button(props){
  return <button
  className="btn btn-outline-primary btn-lg button-width"
  type="submit"
  name="button"
  onClick={props.function}>{props.content}</button>
}

export default Button;
