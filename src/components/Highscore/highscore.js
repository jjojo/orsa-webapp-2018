import React, { Component } from 'react'
import { fire } from '../../modules/firebase'
import Stats from './stats'

export default class Highscore extends Component {
  constructor (props) {
    super(props)

    this.state = {users: [],
    show:false}
    this.usersRef = fire.database().ref('/users')
  }

  componentDidMount () {
    this.usersRef.on('value', (snapshot) => {
      let users = []

      Object.keys(snapshot.val()).forEach(key => {
        users.push(snapshot.val()[key])
      })
      this.setState({users: users})
      console.log(this.state)
    }, (error) => {
      console.log(error)
    })
  }

  // Compares points in the objects passed
  comparePoints (a, b) {
    let comparison = 0

    if (a.points > b.points) {
      comparison = -1
    } else if (b.points > a.points) {
      comparison = 1
    }
    return comparison
  }

  render () {
    return (
      <div>
        <h1>Scoreboard</h1>
          {this.state.users.sort(this.comparePoints)
            .map(person => (
              <div key={person.name}>
                <Stats user={person} show={this.state.show} />
              </div>
            ))}
      </div>
    )
  }
}
