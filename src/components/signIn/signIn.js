import React, { Component } from 'react';

class SignIn extends Component {


  mappa(lista) {
    return lista.map( (item) => {
      return (
        <div key={item}>
          {item}
        </div>
      )
    } )}

  render() {
    return (
      <div>
        <h1>Logga in</h1>
        <input type={"text"}/>
        {[1,2,3].map( (item) => {
          return (
            <div key={item}>
              {item}
            </div>
          )
        } )}

        {this.mappa([4,5,6])}
      </div>
    );
  }
}

export default SignIn;