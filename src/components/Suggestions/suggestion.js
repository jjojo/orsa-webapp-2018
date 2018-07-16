import React, { Component } from 'react'
import './suggestionStyle.css'

const Suggestion = (props) => {

  return (<div className={"suggestion"}>
    <h3>{props.suggestion.points} to {props.suggestion.to} from {props.suggestion.from}</h3>
    <p>
      <strong>Motivering:</strong>
      <br/>
      {props.suggestion.description}
      </p>
    <button type={"button"} onClick={()=> props.accept(props.s)}> Accept </button>
    <button type={"button"} onClick={()=> props.decline(props.s)}> Decline </button>
  </div>)

}


export default Suggestion;