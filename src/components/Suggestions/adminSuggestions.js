import React, { Component } from 'react';
import { fire } from '../../modules/firebase';
import Suggestion from './suggestion'
import './suggestionStyle.css'

class AdminSuggestions extends Component {
  constructor(props) {
    super(props);

    this.state = { suggestions: [],
      changedValue: 0};
    this.db = fire.database()
    this.storage = fire.storage()
    this.suggestionsRef = fire.database().ref('/suggestions');
  }

  componentDidMount() {
    this.suggestionsRef.on('value', (snapshot) => {
      let suggestions = [];
      snapshot.forEach( s => {
        suggestions.push({data: snapshot.val()[s.key], key: s.key})
      })
      this.setState({ suggestions: suggestions });
      console.log(this.state.suggestions)
    }, (error) => {
      console.log(error);
    });


    this.storage.ref('images/CL-styrelsen-2017-10-31-051.jpg').getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
      console.log(url)
      this.setState({imageUrl: url})
      // This can be downloaded directly:
      // var xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = function(event) {
      //   var blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();

      // Or inserted into an <img> element:
      var img = document.getElementById('myimg');
      img.src = url;
      console.log(img.src)

    }).catch(function(error) {
      // Handle any errors
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
        <button onClick={() => window.location.href = '/home'}>Back to menu</button>
        {this.state.suggestions.map( (s,i) => {
          return (
            <div key={i}>
              <img src={this.state.imageUrl}/>
              <Suggestion
                suggestion={s}
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