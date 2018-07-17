import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn/signIn'
import Home from './components/Home/home'
import AddSuggestion from './components/Suggestions/addSuggestion'
import AdminSuggestions from './components/Suggestions/adminSuggestions'
import Highscore from './components/Highscore/highscore'
import History from './components/History/history'

const App = () => {



  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={SignIn}/>
        <Route path={'/home'} component={Home}/>
        <Route path={'/suggestion'} component={AddSuggestion}/>
        <Route path={'/adminSuggestion'} component={AdminSuggestions}/>
        <Route path={'/highscore'} component={Highscore}/>
        <Route path={'/history'} component={History}/>
      </Switch>
    </Router>
  )
}

export default App
