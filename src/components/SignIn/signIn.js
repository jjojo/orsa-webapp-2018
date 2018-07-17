import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { fire } from '../../modules/firebase'
import './signInStyle.css'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    fire.auth().onAuthStateChanged( (user) => {

      if (user) {
        console.log(user.email)
        window.location.href = '/home'
      }
    });
  }



  handleSubmit (e) {
    e.preventDefault()
    fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((user) => {
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })

  }

  render () {
    return (
      <div className={'sign-in'}>
            < form onSubmit={this.handleSubmit}>

              <input className={"submit-btn signin-input"} type='submit' value='Sign In'/>

                <input className={"signin-input"}
                  type={'email'}
                       placeholder={"Email"}
                       value={this.state.username}
                       onChange={e => this.setState({username: e.target.value})}/>

                <input className={"signin-input"}
                       type={'password'} value={this.state.password}
                       placeholder={"Lösenord"}
                       onChange={e => this.setState({password: e.target.value})}/>


            </form>


      </div>
    )
  }
}

export default SignIn