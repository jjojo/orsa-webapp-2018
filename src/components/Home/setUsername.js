import React, { Component } from 'react'
import { fire } from '../../modules/firebase'


class SetUsername extends Component {
  constructor () {
    super()
    this.state = {
      name: "username",
    }
  }

  componentDidMount () {
    this.authSubscription = fire.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          user: user,
        })
        console.log(this.state.user)
      }
    })
  }

  submit(e, name){
    e.preventDefault()
    this.state.user.updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
      console.log("updated")
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
  }

  componentWillUnmount () {
    this.authSubscription()
  }

  render () {
    return (
      <div>
        <h1>Set Username</h1>
        <form onSubmit={(e) => this.submit(e,this.state.name)}>
          <input type={"text"} onChange={(e) => this.setState({name: e.target.value})}/>
          <input type="submit" value="Set name!"/>
        </form>
      </div>
    )
  }
}

export default SetUsername