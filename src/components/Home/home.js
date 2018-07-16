import React, { Component } from 'react'
import SignOut from '../SignOut/signOut'
import Button from './Button'
import SetUsername from './setUsername'
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
          user: user,
          displayName: user.displayName,
          email: user.email,
        })
        console.log(this.state.user)
      } else {
        window.location.pathname = "/"
      }
    })
  }

  componentWillUnmount () {
    this.authSubscription()
  }

  render () {
    return (
      <div className={'background'}>
        <h2 className={'home-h1'}>{this.state.user ? (<div>{'Welcome ' + this.state.user.displayName}</div>) : ''}</h2>
        {this.state.displayName
          ? (<div>
              { this.state.user.uid === '421KpSieGtNA1UItWT4ULT1Ekws1' ? <Button handleClick={() => {window.location.pathname = '/highscore'}} label={'Highscore'}/> : ""}
              { this.state.user.uid === '421KpSieGtNA1UItWT4ULT1Ekws1'
                ? <Button handleClick={() => {window.location.pathname = '/adminSuggestion'}} label={'Suggestions'}/>
                : <Button handleClick={() => {window.location.pathname = '/suggestion'}} label={'Suggestions'}/>}
          </div>)
          : (<div>
            {!this.state.user ? ' ' : <SetUsername user={this.state.user}/>}
          </div>)}

        <SignOut/>

      </div>
    )
  }
}

export default Home