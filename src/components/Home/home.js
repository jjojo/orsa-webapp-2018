import React, { Component } from 'react'
import SignOut from '../SignOut/signOut'
import { fire } from '../../modules/firebase'

import './homeStyle.css'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      loading: true,
    }
  }

  componentDidMount () {
    this.authSubscription = fire.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          loading: false,
          email: user.email,
        })
      }
    })
  }

  componentWillUnmount () {
    this.authSubscription()
  }

  render () {
    return (
      <div>
        <h1>hemskärm</h1>
        {this.state.email ? this.state.email : 'no user signed in'}
        {/* HTML här, css i homeStyle.css*/}

        <SignOut/>

      </div>
    )
  }
}

export default Home