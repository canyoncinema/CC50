import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import MainNav from './components/MainNav/MainNav';

class App extends Component {
  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      console.log('scroll', e);
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <MainNav collapsed={true} backgroundColor="#231f20" />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
