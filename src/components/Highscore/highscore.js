import React, { Component } from 'react';
import { fire } from '../../modules/firebase';

export default class Highscore extends Component {
  constructor(props) {
    super(props);

    this.state = { highscore: [] };
    this.scoresRef = fire.database().ref('/highscore');
  }

  componentDidMount() {
    this.scoresRef.on('value', (snapshot) => {
      this.setState({ highscore: snapshot.val() });
    }, (error) => {
      console.log(error);
    });
  }

  // Compares points in the objects passed
  comparePoints(a, b) {
    let comparison = 0;

    if (a.points > b.points) {
      comparison = -1;
    } else if (b.points > a.points) {
      comparison = 1;
    }
    return comparison;
  }

  render() {
    return (
      <div>
        <h1>Scoreboard</h1>
        {this.state.highscore.sort(this.comparePoints)
          .map(person => (
            <div key={person.name}>
              {`${person.name} ${person.points}`}
            </div>
          ))}
      </div>
    );
  }
}
