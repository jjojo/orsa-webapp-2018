import React, { Component } from 'react';
import { fire } from '../../modules/firebase';
import Suggestion from './suggestion'
import './suggestionStyle.css'

class AdminSuggestions extends Component {
  constructor(props) {
    super(props);

    this.state = { suggestions: [] };
    this.db = fire.database()
    this.suggestionsRef = fire.database().ref('/suggestions');
  }

  componentDidMount() {
    this.suggestionsRef.on('value', (snapshot) => {
      let suggestions = [];
      snapshot.forEach( s => {
        suggestions.push({data: snapshot.val()[s.key], key: s.key})
      })
      this.setState({ suggestions: suggestions });
    }, (error) => {
      console.log(error);
    });
  }

  accept(s) {
    this.db.ref('/users/' + s.data.to.toLowerCase() + '/pointsReceived/' + s.data.from.toLowerCase())
      .transaction((currentValue) => {
        return currentValue + parseInt(s.data.points)
      })

    this.db.ref('/users/' + s.data.to.toLowerCase() + '/points')
      .transaction((currentValue) => {
        return currentValue + parseInt(s.data.points)
      })

    this.db.ref('/users/' + s.data.from.toLowerCase() + '/pointsGiven/' + s.data.to.toLowerCase())
      .transaction((currentValue) => {
        return currentValue + parseInt(s.data.points)
      })

    this.db.ref('/suggestions/' + s.key).remove()
  }


  decline(s) {
    this.db.ref('/suggestions/' + s.key).remove()
  }



  render() {
    return (
      <div className={"admin-suggestions"}>
        <h1 className={"admin-suggestion-h1"}>Suggestions</h1>
        {this.state.suggestions.map( (s,i) => {
          console.log(s)
          return (
            <div key={i}>
              <Suggestion suggestion={s.data} accept={() => this.accept(s)} decline={() => this.decline(s)}/>
              {/*<h4>{` Till: ${s.to} poäng: ${s.points} från: ${s.from} tid: ${s.timestamp} `}</h4>*/}
              {/*<p>{s.description}</p>*/}
            </div>
          )
        })}
      </div>
    );
  }
}

export default AdminSuggestions