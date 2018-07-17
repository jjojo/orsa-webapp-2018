import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import Button from '../Home/Button.js'

import { fire } from '../../modules/firebase'

const SignOut = () => {

    return (
      <div>

        <Button handleClick={()=> {
          fire.auth().signOut().then( (success) => {
            // Sign-out successful.
            console.log(success)
            console.log("hej")
          }).catch(function(error) {
            // An error happened.
            console.log(error)
          });
        }} label={"Sign out"}>
          Logga ut
        </Button>

      </div>
    )
}

export default SignOut;
