import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

import { getQueryVal } from './utils/query-string';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import FooterIsLoading from './components/FooterIsLoading/FooterIsLoading';
import EventsPage from './components/EventsPage/EventsPage';
import NewsPage from './components/NewsPage/NewsPage';
import NewsDetail from './components/NewsDetail/NewsDetail';
import EventDetail from './components/EventDetail/EventDetail';
import AboutPage from './components/AboutPage/AboutPage';
import TourPage from './components/TourPage/TourPage';
import SupportUsPage from './components/SupportUsPage/SupportUsPage';
import CollectionPage from './components/CollectionPage/CollectionPage';
import CollectionPageHome from './components/CollectionPageHome/CollectionPageHome';
import CollectionPageItems from './components/CollectionPageItems/CollectionPageItems';
import CollectionPageItem from './components/CollectionPageItem/CollectionPageItem';
import CollectionFilmPage from './components/CollectionFilmPage/CollectionFilmPage';
import CollectionFilmmakerPage from './components/CollectionFilmmakerPage/CollectionFilmmakerPage';
import CollectionProgramPage from './components/CollectionProgramPage/CollectionProgramPage';
import CollectionEphemeraPage from './components/CollectionEphemeraPage/CollectionEphemeraPage';
import MainNav from './components/MainNav/MainNav';
import Page404 from './components/Page404/Page404';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNav includesCollapsedItemPageNav={false} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tour" component={TourPage} />
          <Route exact path="/collection/films/:shortIdentifier" component={({ match }) =>
            <CollectionFilmPage
              shortIdentifier={match.params.shortIdentifier}
              collectionItems="films" />
          } />
          <Route exact path="/collection/filmmakers/:shortIdentifier" component={({ match }) =>
            <CollectionFilmmakerPage
              shortIdentifier={match.params.shortIdentifier}
              collectionItems="filmmakers" />
          } />
          <Route exact path="/collection/programs/:shortIdentifier" component={({ match }) =>
            <CollectionProgramPage
              shortIdentifier={match.params.shortIdentifier}
              collectionItems="programs" />
          } />
          <Route exact path="/collection/ephemera/:shortIdentifier" component={({ match }) =>
            <CollectionEphemeraPage
              shortIdentifier={match.params.shortIdentifier}
              collectionItems="ephemera" />
          } />
          <Route exact
            path="/collection/:collectionItems(films|filmmakers|programs|ephemera)/:itemId"
            component={({match}) =>
              <CollectionPageItem
                collectionItems={match.params.collectionItems}
                itemId={match.params.itemId} />
            } />
          <Route path="/collection(/)?:collectionItems(films|filmmakers|programs|ephemera|films/|filmmakers/|programs/|ephemera/)?*" render={({match, location}) => {
            const searchedText = getQueryVal(location.search, 'search');
            const viewMode = getQueryVal(location.search, 'view') || 'grid';
            return <CollectionPage
              match={match}
              nonCollectionItemsString={match.params[1].replace(/^\//,'')}
              collectionItems={match.params.collectionItems}
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
          <Route exact path="/events" component={EventsPage} />
          <Route exact path="/events/:csid"
            component={({match}) =>
              <EventDetail
                key={match.params.csid}
                csid={match.params.csid} />
            } />
            <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/news/:slug" component={({match}) =>
            <NewsDetail slug={match.params.slug} key={match.params.slug} />
          } />
          <Route exact path="/about" component={({history}) =>
            <AboutPage activeTab="about" />
          } />
          <Route exact path="/support" component={({history}) =>
            <AboutPage activeTab="support" />
          } />
          <Route path="*" component={Page404} />
        </Switch>
        
        <Route exact path="/features/writings-and-essays" component={CollectionPage} />
        <Route exact path="/features/tour" component={CollectionPage} />
        <Route exact path="/press" component={CollectionPage} />
        <Footer className="no-gutters" />
      </div>
    );
  }
}

export default App;
