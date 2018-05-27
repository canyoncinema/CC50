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
          
          <Route exact path="/collection/programs" component={CollectionPage} />
          <Route exact path="/collection/programs/:id" component={CollectionPage} />
          
          <Route exact path="/collection/films" component={CollectionPage} />
          <Route exact path="/collection/films/:id" component={CollectionPage} />

          <Route exact path="/collection/filmmakers" component={CollectionPage} />
          <Route exact path="/collection/filmmakers/:id" component={CollectionPage} />

          <Route exact path="/collection/ephemera" component={CollectionPage} />
          <Route exact path="/collection/ephemera/:id" component={CollectionPage} />

          <Route exact path="/features/writings-and-essays" component={CollectionPage} />
          <Route exact path="/features/tour" component={CollectionPage} />

          <Route exact path="/events" component={CollectionPage} />
          <Route exact path="/events/:id" component={CollectionPage} />

          <Route exact path="/news" component={CollectionPage} />
          <Route exact path="/news/:id" component={CollectionPage} />

          <Route exact path="/about" component={CollectionPage} />
          <Route exact path="/press" component={CollectionPage} />
        </div>
      </Router>
    );
  }
}

export default App;
