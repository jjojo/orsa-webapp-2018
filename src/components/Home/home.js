import React, { Component } from 'react'
import SignOut from '../SignOut/signOut'
import Button from "./Button"
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
      <div className={"backgroundHome"}>
      {/* {this.state.email ? this.state.email : 'no user signed in'}*/}
        {/* HTML här, css i homeStyle.css*/}
        <div><Button handleClick={() =>
        {window.location.pathname = '/highscore'}} label={"Highscore"}/></div>
        <div><Button handleClick={() =>
        {window.location.pathname = '/suggestion'}} label={"Suggestions"}/></div>


        <SignOut/>

      </div>
    )
  }
}

export default Home