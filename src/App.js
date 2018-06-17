import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import { getQueryVal } from './utils/query-string';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import CollectionPage from './components/CollectionPage/CollectionPage';
import CollectionPageHome from './components/CollectionPageHome/CollectionPageHome';
import CollectionPageItems from './components/CollectionPageItems/CollectionPageItems';
import CollectionPageItem from './components/CollectionPageItem/CollectionPageItem';
import CollectionFilmPage from './components/CollectionFilmPage/CollectionFilmPage';
import CollectionFilmmakerPage from './components/CollectionFilmmakerPage/CollectionFilmmakerPage';
import CollectionProgramPage from './components/CollectionProgramPage/CollectionProgramPage';
import MainNav from './components/MainNav/MainNav';
import Page404 from './components/Page404/Page404';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MainNav />
          <Route exact path="/" component={HomePage} />
          <Switch>
            <Route exact path="/collection/films/:itemId" component={({ match }) =>
              <CollectionFilmPage
                itemId={match.params.itemId}
                collectionItems="films" />
            } />
            <Route exact path="/collection/filmmakers/:itemId" component={({ match }) =>
              <CollectionFilmmakerPage
                itemId={match.params.itemId}
                collectionItems="filmmakers" />
            } />
            <Route exact path="/collection/programs/:itemId" component={({ match }) =>
              <CollectionProgramPage
                itemId={match.params.itemId}
                collectionItems="programs" />
            } />
            <Route exact
              path="/collection/:collectionItems(films|filmmakers|programs|ephemera)/:itemId"
              component={({match}) =>
                <CollectionPageItem
                  collectionItems={match.params.collectionItems}
                  itemId={match.params.itemId} />
              } />
            <Route path="/collection(/)?:collectionItems(films|filmmakers|programs|ephemera)?*" render={({match, location}) => {
              const searchedText = getQueryVal(location.search, 'search');
              const viewMode = getQueryVal(location.search, 'view') || 'grid';
              return <CollectionPage
                match={match}
                nonCollectionItemsString={match.params[1]}
                collectionItemsString={match.params.collectionItems}
                searchedText={searchedText}
                viewMode={viewMode}>
                <Switch>
                  <Route exact path="/collection/:collectionItems(films|filmmakers|programs|ephemera)" render={({ match }) => {
                    return <CollectionPageItems
                      viewMode={viewMode}
                      searchedText={searchedText}
                      collectionItems={match.params.collectionItems} />
                  }
                  } />
                  <Route path="/collection" component={({location}) => {
                    return <CollectionPageHome
                      viewMode={getQueryVal(location.search, 'view') || 'grid'} />
                  }} />
                </Switch>
              </CollectionPage>
            }} />
          </Switch>
          
          <Route exact path="/features/writings-and-essays" component={CollectionPage} />
          <Route exact path="/features/tour" component={CollectionPage} />

          <Route exact path="/events" component={CollectionPage} />
          <Route exact path="/events/:id" component={CollectionPage} />

          <Route exact path="/news" component={CollectionPage} />
          <Route exact path="/news/:id" component={CollectionPage} />

          <Route exact path="/about" component={CollectionPage} />
          <Route exact path="/press" component={CollectionPage} />
          <Footer className="no-gutters" />
        </div>
      </Router>
    );
  }
}

export default App;
