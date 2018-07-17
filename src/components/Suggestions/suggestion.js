import React, { Component } from 'react'
import './suggestionStyle.css'
import { fire } from '../../modules/firebase';

const Suggestion = (props) => {

  const edit = (s,v) => {
    fire.database().ref('/suggestions/' + s.key + '/points').transaction( currVal => {
      return v
    },(error) =>{
    })
  }

  return (<div className={"suggestion"}>
    <h3>{props.suggestion.data.points} to {props.suggestion.data.to} from {props.suggestion.data.from}</h3>
    <p>
      <strong>Motivering:</strong>
      <br/>
      {props.suggestion.data.description}
      </p>
    <button type={"button"} onClick={()=> props.accept(props.suggestion)}> Accept </button>
    <button type={"button"} onClick={()=> props.decline(props.suggestion)}> Decline </button>
    <select value={"0"} onChange={e => edit(props.suggestion,e.target.value)}>
      {
        Array.from({length: 21}, (x, i) => i - 10).map(num => {
          return (<option key={num} value={num}>
            {num}
          </option>)
        })
      }
    </select>
  </div>)

}


export default Suggestion;