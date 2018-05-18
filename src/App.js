import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { Row, Col } from 'reactstrap';
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


import './App.css';

class App extends Component {
  state = {
    films: [],
    upcomingEvents: []
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
  }

  render() {
    const { upcomingEvents } = this.state;

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
              <h1 className="lead d-flex">
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
              <h1 className="lead">News</h1>
            </Col>
          </Row>
        
          <Row>
            <Col sm="12">
              <h1 className="lead">Featured</h1>
            </Col>
          </Row>
        
          <Row>
            <Col sm="12">
              <h1 className="lead">Footer</h1>
            </Col>
          </Row>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
