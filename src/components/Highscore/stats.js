import React, { Component } from 'react'
import './statsStyle.css'

class Stats extends Component {
  constructor (props) {
    super(props)

    this.state = {show:false}
  }

  objectToArray = (obj) => {
    let pr = []
    if (obj !== null && typeof(obj) !== 'undefined') {
      Object.keys(obj).forEach(_ => {
        pr.push(obj)
      })
    }
    return pr
  }

  render(){
    return (
      <div className={'stats'} onClick={()=> this.setState({show: !this.state.show})}>
        <p className={'name-score'}>{this.props.user.name} <span className={'f-right'}>{this.props.user.points}</span></p>

        { this.state.show ? <div className={'wrapper'}>
            <div className={'received'}>
              <h5>Received from:</h5>
              {this.objectToArray(this.props.user.pointsReceived).map((prObj, i) => {
                console.log(Object.keys(prObj)[i])
                return (<p key={i}>{Object.keys(prObj)[i]} <span className={'f-right'}>{prObj[Object.keys(prObj)[i]]}</span></p>)
              })}
            </div>

            <div className={'given'}>
              <h5>Given to:</h5>
              {this.objectToArray(this.props.user.pointsGiven).map((pgObj, i) => {
                console.log(Object.keys(pgObj)[i])
                return (<p key={i}>{Object.keys(pgObj)[i]} <span className={'f-right'}>{pgObj[Object.keys(pgObj)[i]]}</span></p>)
              })}
            </div>
          </div>
          : ""}

      </div>
    )
  }
}

export default Stats