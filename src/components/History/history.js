import React, { Component } from 'react'
import { fire } from '../../modules/firebase'


export default class History extends Component {
  constructor (props) {
    super(props)

    this.state = {}
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

  render () {
    return (
      <div>
        <h1>History</h1>
        <p>
        2009 SOMMAR Jesper Jonas Krill Järker<br/>
          <br/>
        2010 VINTER Jesper Jonas krill Järker Lasse<br/>
          <br/>
        2011 SOMMAR Jesper Jonas Järker KUSINER USA<br/>
          <br/>
        2011 SOMMAR Jesper Jonas Krill<br/>
          <br/>
        2012 SOMMAR Jesper Jonas Johan A midsommar<br/>
          <br/>
        2012 SOMMAR Jesper Jonas Johan A Krill Sandström<br/>
          <br/>
        2013 SOMMAR Jesper Jonas Johan A Krill Christian<br/>
          <br/>
        2013 SOMMAR Jesper Emil Minna Maja<br/>
          <br/>
        2013 VINTER Jesper Jonas<br/>
          <br/>
        2014 SOMMAR Jesper Krill Christian Sandström Johan A Jonas med flickvän på besök<br/>
          <br/>
        2014 SOMMAR Jesper Johan A såga stock stannar tills resten kommer<br/>
          <br/>
        2014 SOMMAR Jesper Jonas Krill Johan A KUSINER på besök<br/>
          <br/>
        2015 SOMMAR Jesper Jonas Krill Christian Vincent Johan S Johan A Mattson<br/>
          <br/>
        2016 SOMMAR Jesper Jonas Krill Christian Johan A Johan S Vincent<br/>
          <br/>
        2017 SOMMAR Jesper Jonas Krill Johan A Axel Andreas Christian<br/>
          <br/>
        2018 SOMMAR Jesper Jonas Krill Johan A Axel Vincent Tobias(gingertabz)<br/>
        </p>
      </div>
    )
  }
}
