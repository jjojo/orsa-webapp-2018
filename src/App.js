import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn/signIn'
import Home from './components/Home/home'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={SignIn}/>
        <Route path={'/home'} component={Home}/>
      </Switch>
    </Router>
  )
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//
//         <SignIn/>
//
//
//
//
//       </div>
//     );
//   }
// }

export default App
