import React, { Component } from 'react'
import { fire } from '../../modules/firebase'
import './suggestionsStyle.css'

export default class AddSuggestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      to: '',
      from: '',
      points: 0,
      description: '',
      people: []
    }
    // Create a root reference
    this.storageRef = fire.storage().ref()
    this.suggestionsRef = fire.database().ref('/suggestions')
    this.usersRef = fire.database().ref('/users')
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.authSubscription = fire.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          email: user.email,
          user: user,
        })
      } else {
        window.location.href = '/'
      }
    })
    this.fetchUsers()
  }

  fetchUsers(){
    this.usersRef.on('value', (snapshot) => {
      let people = []
      console.log(snapshot.val())
      Object.keys(snapshot.val()).forEach(key => {
        if(key !== this.state.user.email.split("@")[0]){
          people.push(snapshot.val()[key])
        }
      })
      this.setState({people: people})
      console.log(this.state)
    }, (error) => {
      console.log(error)
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
        from: this.state.email.split('@')[0],
        points: this.state.points,
        description: this.state.description,
        timestamp: new Date().toUTCString()
      }
    ).then( () => {
        alert("thanks for the suggestion")
        this.setState({
          to: '',
          from: '',
          points: 0,
          description: '',
        })
        this.fetchUsers()
      }
    )

    // const ImagesRef = this.storageRef.child('images/' + this.state.imageName)
    // ImagesRef.putString(this.state.image).then((snapshot) => {
    //   console.log('Uploaded a blob or file!')
    // })

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
        // Create a root reference
        this.storageRef = fire.storage().ref()
        this.suggestionsRef = fire.database().ref('/suggestions')
      }

      // Load files into file reader
      reader.readAsDataURL(file)
    }
  }

  render () {
    return (
      <div className={'backgroundSuggestions'}>
        {this.state.user && this.state.user.uid === '421KpSieGtNA1UItWT4ULT1Ekws1' ? 'You are signd in as admin and can\'t make suggestions' :
          <div>
            <form className={'formField'} onSubmit={this.handleSubmit}>
              <div className={'containerDropdown'}>
                <label>
                  {"Give points to: "}
                  <select className={"select"} value={this.state.to} onChange={e => this.setState({to: e.target.value})}>
                    {
                      this.state.people.map(person => {
                        return (<option key={person.name} value={person.name}>
                          {person.name}
                        </option>)
                      })
                    }
                  </select>
                </label>
              </div>
              <div>
      <textarea className={"textarea"}
                value={this.state.description}
                onChange={e => this.setState({description: e.target.value})}
                placeholder={'Motivation..'}/>
              </div>
              <div className={'containerDropdown'}>
                <label>
                  {'Points: '}
                  <select className={"select"} value={this.state.points} onChange={e => this.setState({points: e.target.value})}>
                    {
                      Array.from({length: 21}, (x, i) => i - 10).map(num => {
                        return (<option key={num} value={num}>
                          {num}
                        </option>)
                      })
                    }
                  </select>
                </label>
              </div>

              <div>
                <label>
                  Proof:
                  <input type={'file'}
                         onChange={(e) => {
                           console.log(e.target.files)
                           // this.resizeImage(e.target.files[0])
                         }}/>
                </label>
              </div>

              <img src={this.state.image} className={'imageUpload'}/>


              <input className={"submit-suggestion-btn"} type="submit" value="Submit"/>
            </form>
          </div>}
      </div>
    )
  }
}
