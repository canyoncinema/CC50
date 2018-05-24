import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';
import './utils/OnHover.css';

import Head from './components/Head/Head';
import HomePage from './components/HomePage/HomePage';
import CollectionPage from './components/CollectionPage/CollectionPage';
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
          <Head />
          <MainNav collapsed={true} backgroundColor="#231f20" />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/collection" component={CollectionPage} />
        </div>
      </Router>
    );
  }
}

export default App;
