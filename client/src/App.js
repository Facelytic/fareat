import React, { Component } from 'react';
import 'bulma/css/bulma.css';

import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Footer from './components/Footer'

// import store from './store'
import Index from './components/Index.js'

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <div className="App">
          <Router>
            <div>
              <Route exact path="/" component={Footer}/>
              {/* <Route exact path="/home" component={Home}/> */}
            </div>
          </Router>
        </div>
      // </Provider>
    );
  }
}

export default App;
