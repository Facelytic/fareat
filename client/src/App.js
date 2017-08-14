import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import * as firebase from 'firebase'

// import logo from './logo.svg';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import store from './store'
import Index from './components/Index.js'
import SignIn from './components/SignIn.js'
import Home from './components/Home'
import AddNewStudent from './components/AddNewStudent'
import NewAbsent from './components/NewAbsent'
import InsertClass from './components/InsertClass'
import AbsentProgress from './components/AbsentProgress'

import InsertSubject from './components/InsertSubject'
import DataAbsent from './components/DataAbsent'
import testing from './components/testing'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currUser: "Sidik",
      classList: [ "Dead Fox", "Ethopian Fox", "Fire Fox", "Grey Fox", "Happy Fox", "Island Fox" ],
      subjectList: [ "VueJS", "API", "React", "Express", "Sequelize"],
      pertemuanList: [ 1, 2, 3, 4, 5, 6, 7],
      hasilGo: ""
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <div>
              <Route exact path="/" component={Index}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/create-new-student" component={AddNewStudent}/>
              <Route exact path="/create-new-absent" component={NewAbsent}/>
              <Route exact path="/new-class" component={InsertClass}/>
              <Route exact path="/new-subject" component={InsertSubject}/>
              <Route exact path="/data-absent" component={DataAbsent}/>
              <Route exact path="/test" component={testing}/>
              <Route exact path="/absent/in-progress" component={AbsentProgress}/>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDi5dB55TluOsc1Vw--bru8tJvN1Suv1r0",
      authDomain: "freat-7b322.firebaseapp.com",
      databaseURL: "https://freat-7b322.firebaseio.com",
      projectId: "freat-7b322",
      storageBucket: "freat-7b322.appspot.com",
      messagingSenderId: "514164172565"
    };
    firebase.initializeApp(config);
  }
}

export default App;
