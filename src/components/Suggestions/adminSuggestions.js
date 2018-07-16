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

  transact(path, suggestion){
    this.db.ref('/users/' + path)
      .transaction((currentValue) => {
        return currentValue + parseInt(suggestion.data.points)
      })
  }

  accept(s) {
    let from = s.data.from.toLowerCase()
    let to = s.data.to.toLowerCase()

    this.transact(to + '/pointsReceived/' + from, s)
    this.transact(to + '/points', s)
    this.transact(from + '/pointsGiven/' + to, s)
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
          return (
            <div key={i}>
              <Suggestion
                suggestion={s.data}
                accept={() => this.accept(s)}
                decline={() => this.decline(s)}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

export default AdminSuggestions