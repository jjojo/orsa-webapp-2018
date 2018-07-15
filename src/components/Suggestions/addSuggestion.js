import React, { Component } from 'react'
import { fire } from '../../modules/firebase'

export default class AddSuggestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      to: 'Jesper',
      from: 'signed in user',
      points: 0,
      description: 'description goes here',
      people: [
        {name: 'Jesper'},
        {name: 'Axel'},
        {name: 'Oliver'},
        {name: 'Jonas'},
        {name: 'Andreas'},
        {name: 'Johan A'},
        {name: 'Krillmackan'},
        {name: 'Christian'}
      ]
    }

    this.suggestionsRef = fire.database().ref('/suggestions')
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.suggestionsRef.push(
      {
        to: this.state.to,
        from: 'signed in user',
        points: this.state.points,
        description: this.state.description,
        timestamp: new Date().toUTCString()
      })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
          Till:
          <select value={this.state.to} onChange={ e => this.setState({to: e.target.value})}>
            {
              this.state.people.map(person => {
                return (<option key={person.name} value={person.name}>
                  {person.name}
                </option>)
              })
            }
          </select>
        </label>

        <label>
          Poäng:
          <select value={this.state.points} onChange={e => this.setState({points: e.target.value})}>
            {
              Array.from({length: 21}, (x, i) => i - 10).map( num => {
                return (<option key={num} value={num}>
                  {num}
                </option>)
              })
            }
          </select>
        </label>


        <label>
          Beskrivning:
          <textarea value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})}/>
        </label>

        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
