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
        window.location.href = "/"
      }
    })
  }

  componentWillUnmount () {
    this.authSubscription()
  }

  render () {
    return (
      <div className={'backgroundHome'}>
        <h2 className={'home-h1'}>{this.state.user ? (<div>{'Welcome ' + this.state.user.displayName}</div>) : ''}</h2>
        {this.state.displayName
          ? (<div>
              { this.state.user.uid === '421KpSieGtNA1UItWT4ULT1Ekws1' ? <Button handleClick={() => {window.location.href = '/highscore'}} label={'Highscore'}/> : ""}
              { this.state.user.uid === '421KpSieGtNA1UItWT4ULT1Ekws1'
                ? <Button handleClick={() => {window.location.href = '/adminSuggestion'}} label={'Suggestions'}/>
                : <Button handleClick={() => {window.location.href = '/suggestion'}} label={'Suggestions'}/>}
          </div>)
          : (<div>
            {!this.state.user ? ' ' : <SetUsername user={this.state.user}/>}
          </div>)}
        <Button handleClick={() => {window.location.href = '/history'}} label={'History'}/>
        <SignOut/>

      </div>
    )
  }
}

export default Home