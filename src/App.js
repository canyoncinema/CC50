import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import './utils/OnHover.css';
import Head from './components/Head/Head';
import HomePage from './components/HomePage/HomePage';
import CollectionPage from './components/CollectionPage/CollectionPage';
import CollectionPageHome from './components/CollectionPageHome/CollectionPageHome';
import CollectionPageItem from './components/CollectionPageItem/CollectionPageItem';
import MainNav from './components/MainNav/MainNav';

/*
        <Route exact path="/collection/programs" component={CollectionPage} />
        <Route exact path="/collection/programs/:id" component={CollectionPage} />
        
        <Route exact path="/collection/films" component={CollectionPage} />
        <Route exact path="/collection/films/:id" component={CollectionPage} />

        <Route exact path="/collection/filmmakers" component={CollectionPage} />
        <Route exact path="/collection/filmmakers/:id" component={CollectionPage} />

        <Route exact path="/collection/ephemera" component={CollectionPage} />
        <Route exact path="/collection/ephemera/:id" component={CollectionPage} />


        <Route path="/collection" component={CollectionPage}>
            <Switch>
              <Route exact path="/films" component={CollectionPageItem} />
              <Route path="/" component={CollectionPageHome} />
            </Switch>
          </Route>
*/
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Head />
          <MainNav />
          <Route exact path="/" component={HomePage} />

          <Route path="/collection" children={() =>
            <CollectionPage>
              <Switch>
                <Route exact path="/collection/:item" render={({match}) =>
                  <CollectionPageItem match={match}/>} />
                <Route path="/collection" component={CollectionPageHome} />
              </Switch>
            </CollectionPage>
          } />
          
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
