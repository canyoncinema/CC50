import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { Row, Col } from 'reactstrap';
import data from './db.json';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';



import logo from './logo.svg';
import MainNav from './components/MainNav/MainNav';
import Hero from './components/Hero/Hero';
import HomeIntro from './components/HomeIntro/HomeIntro';
import Spotlight from './components/Spotlight/Spotlight';
import Button from './components/Button/Button';
import EventTiles from './components/EventTiles/EventTiles';
import DarkBox from './components/DarkBox/DarkBox';
import NewsTile from './components/NewsTile/NewsTile';
import FeaturedPost from './components/FeaturedPost/FeaturedPost';
import Footer from './components/Footer/Footer';

import './App.css';

const optimalColWidths = (num) => {
  const widths = []
  if (num == 1) widths.push(1);
  if (num == 2) widths.push(2);
  if (num == 3) widths.push(3);
  if (num > 3) {
    while (num > 0) {
      widths.push(3);
      num -= 3;
    }
  }
  return widths;
};

const { films, filmmakers, curatedPrograms, ephemera, events, news, featuredPosts } = data.films;

class App extends Component {
  state = {
    films: films || [],
    upcomingEvents: events || [],
    newsItems: news || [],
    featuredPosts: featuredPosts || []
  }

  componentDidMount() {
    axios.get('//localhost:3001/films')
      .then(response => {
        for (var i = 0; i <= 100; i++) {
          var spoofData = response.data.concat(response.data);
        }
        return response.data;
      })
      .then(data => {
        this.setState({
          films: data
        });
      });

    axios.get('//localhost:3001/events')
      .then(response => {
        var spoofData = response.data.concat(response.data).concat(response.data);
        return spoofData;
      })
      .then(data => {
        this.setState({
          upcomingEvents: data
        });
      });

    axios.get('//localhost:3001/news')
      .then(response => {
        this.setState({
          newsItems: response.data
        });
      });

    axios.get('//localhost:3001/featuredPosts')
      .then(response => {
        this.setState({
          featuredPosts: response.data
        });
      });
  }

  render() {
    const { upcomingEvents, newsItems, featuredPosts } = this.state;

    var spotlightData = [{
      name: 'Portland (1996)',
      note: 'Film by Greta Snider',
      description: 'The film is a documentary road movie about travel, the fallibility of photographs, and the merging of memory and imagination. Three friends, including the lorem ipsum other text goes here.',
    }, {
      name: 'Scott Stark',
      note: 'Filmmaker',
      description: 'Scott Stark has made over 65 films and videos since the early 1980s, and has created numerous installations, performances and photo-collages as well. His work has shown nationally lorem ispuem other stuff'
    }, {
      name: 'Fake Fruit Factory (1986)',
      note: 'By Chick Strand',
      description: 'Intimate documentary about young women who make papier mache fruit and vegetables in a small factory in Mexico. They have a gringo boss, but the factory is owned by his Mexican wife lorem ipsum and stuff'      
    }];
    return (
      <Router>
      <div className="App">
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Canyon Cinema</title>
            <link rel="canonical" href="http://canyoncinema.com/beta" />
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <link href="https://fonts.googleapis.com/css?family=Karla|Lora" rel="stylesheet" />
        </Helmet>
        <Hero active={true}>
          <div className="container-fluid">
            <Row>
              <Col sm="12">
                <MainNav />
              </Col>
            </Row>
          </div>
          <div className="container-fluid padded-container">
            <Row>
              <Col sm="12">
                <HomeIntro />
              </Col>
            </Row>
          </div>
        </Hero>
        <div className="container-fluid padded-container">
          <Row>
            <Col sm="12">
              <h1 className="lead upcoming-events d-flex">
                Upcoming events
                <span className="p-1 ml-auto">
                  <Button size="default">
                    See all Events
                  </Button>
                </span>
              </h1>
              <EventTiles data={upcomingEvents} />
            </Col>
          </Row>
        
          <Row>
            <Col sm="12">
              <h1 className="lead discover">Discover something new to teach or share</h1>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <DarkBox>
                <h3>Educators</h3>
                <p>
                  Browse curated classroom content and our library of related writings, videos, and other ephemera as it relates to the works and filmmakers in our catalog.
                </p>
              </DarkBox>
            </Col>
            <Col sm="4">
              <DarkBox>
                <h3>Students</h3>
                <p>
                  Learn about the history of our collection of films and filmmakers and how it relates the avant-garde and experimental filmmaking movements from 1921 to the present. 
                </p>
              </DarkBox>
            </Col>
            <Col sm="4">
              <DarkBox>
                <h3>Curators</h3>
                <p>
                  Browse our curated programs, hand-picked by our staff and board, or explore the collection to curate your own program.
                </p>
              </DarkBox>
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              <h1 className="lead d-flex news">
                News
                <span className="p-1 ml-auto">
                  <Button size="default">
                    Read All News
                  </Button>
                </span>
              </h1>
            </Col>
          </Row>

          <Row>
            {
              optimalColWidths(newsItems.length).map((colWidth) => (
                newsItems.slice(0, colWidth).map((d, i) => {
                  return (
                    <Col sm={12 / colWidth}>
                      <NewsTile {...d} key={i} />
                    </Col>
                  );
              })))
            }
          </Row>
        </div>
        <div className="container-fluid">
          <Row className="featured-posts">
            {
              optimalColWidths(featuredPosts.length).map((colWidth) => (
                featuredPosts.slice(0, colWidth).map((d, i) => {
                  return (
                    <Col sm={12 / colWidth}>
                      <FeaturedPost {...d} key={i} />
                    </Col>
                  );
              })))
            }
          </Row>
        
          <Row>
            <Col sm="12">
              <Footer />
            </Col>
          </Row>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
