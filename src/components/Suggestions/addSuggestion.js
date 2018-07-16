import React, { Component } from 'react'
import { fire } from '../../modules/firebase'

export default class AddSuggestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      to: 'Jesper',
      from: 'signed in user',
      points: 0,
      description: 'description goes here',
      people: [
        {name: 'Jesper'},
        {name: 'Axel'},
        {name: 'Oliver'},
        {name: 'Jonas'},
        {name: 'Andreas'},
        {name: 'Johan A'},
        {name: 'Krillmackan'},
        {name: 'Christian'}
      ]
    }
    // Create a root reference
    this.storageRef = fire.storage().ref()
    this.suggestionsRef = fire.database().ref('/suggestions')
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.authSubscription = fire.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          email: user.email,
        })
      }
    })
  }

  componentWillUnmount () {
    this.authSubscription()
  }

  handleSubmit (event) {
    event.preventDefault()
    this.suggestionsRef.push(
      {
        to: this.state.to,
        from: this.state.email,
        points: this.state.points,
        description: this.state.description,
        timestamp: new Date().toUTCString()
      }
    )

    const ImagesRef = this.storageRef.child('images/' + this.state.imageName);
    ImagesRef.putString(this.state.image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

  }

  resizeImage (file) {
    this.setState({
      imageName: file.name
    })
    // Create an image
    var img = document.createElement('img')

    // Create a file reader
    var reader = new FileReader()

    // Set the image once loaded into file reader
    reader.onload = (e) => {
      img.src = e.target.result
      img.onload = () => {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        var MAX_WIDTH = 500
        var MAX_HEIGHT = 500
        var width = img.width
        var height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height

        ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        this.setState({image: canvas.toDataURL('image/png')})
      }
    }
    // Load files into file reader
    reader.readAsDataURL(file)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
          Till:
          <select value={this.state.to} onChange={e => this.setState({to: e.target.value})}>
            {
              this.state.people.map(person => {
                return (<option key={person.name} value={person.name}>
                  {person.name}
                </option>)
              })
            }
          </select>
        </label>

        <label>
          Poäng:
          <select value={this.state.points} onChange={e => this.setState({points: e.target.value})}>
            {
              Array.from({length: 21}, (x, i) => i - 10).map(num => {
                return (<option key={num} value={num}>
                  {num}
                </option>)
              })
            }
          </select>
        </label>


        <label>
          Beskrivning:
          <textarea value={this.state.description}
                    onChange={e => this.setState({description: e.target.value})}/>
        </label>

        <label>
          ladda upp foto:
          <input type={'file'}
                 onChange={(e) => {
                   console.log(e.target.files)
                   this.resizeImage(e.target.files[0])
                 }}/>
        </label>


        <img src={this.state.image} id="output"/>


        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
