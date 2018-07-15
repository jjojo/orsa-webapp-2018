import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'

import { fire } from '../../modules/firebase'

const SignOut = () => {

    return (
      <div>

        <button onClick={()=> {
          fire.auth().signOut().then( (success) => {
            // Sign-out successful.
            console.log(success)
            console.log("hej")
          }).catch(function(error) {
            // An error happened.
            console.log(error)
          });
        }}>
          Logga ut
        </button>

      </div>
    )
}

export default SignOut;
