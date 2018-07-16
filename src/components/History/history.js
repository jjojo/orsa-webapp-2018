import React, { Component } from 'react'


export default class History extends Component {
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

  render () {
    return (
      <div>
        <h1>History</h1>
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
