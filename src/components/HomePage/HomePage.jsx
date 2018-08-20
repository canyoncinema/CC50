import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './HomePage.css';

import { getEvents } from '../../actions/events-actions';
import { getNews } from '../../actions/news-actions';

import Hero from '../Hero/Hero';
import HomeIntro from '../HomeIntro/HomeIntro';
import Spotlight from '../Spotlight/Spotlight';
import Button from '../Button/Button';
import EventTiles from '../EventTiles/EventTiles';
import DarkBox from '../DarkBox/DarkBox';
import NewsTile from '../NewsTile/NewsTile';
import FeaturedPost from '../FeaturedPost/FeaturedPost';
import MainNav from '../MainNav/MainNav';
import withScrollNav from '../withScrollNav/withScrollNav';

const optimalColWidths = (num) => {
  const widths = []
  if (num === 1) widths.push(1);
  if (num === 2) widths.push(2);
  if (num === 3) widths.push(3);
  if (num > 3) {
    while (num > 0) {
      widths.push(3);
      num -= 3;
    }
  }
  return widths;
};

const mapStateToProps = state => ({
  upcomingEvents: state.events.upcoming,
  news: state.news.data,
  featuredPosts: state.featuredPosts.data,
  events: state.events.data
});

const mapDispatchToProps = dispatch => ({
  getEvents: (...args) => dispatch(getEvents(...args)),
  getNews: (...args) => dispatch(getNews(...args))
});

class HomePage extends Component {
  componentDidMount() {
    if (this.props.changeMainNavBg) {
      this.props.changeMainNavBg('transparent');
    }

    this.props.getEvents({
      pgSz: 3
    });
    this.props.getNews({
      limit: 3
    });
  }

  render() {
    const {
      events, // TODO: upcoming only
      news,
      featuredPosts,
      isScrollNav
    } = this.props;
    // Turn on when discover component is ready (posts are in)
    const discoverReady = false;

    // var spotlightData = [{
    //   name: 'Portland (1996)',
    //   note: 'Film by Greta Snider',
    //   description: 'The film is a documentary road movie about travel, the fallibility of photographs, and the merging of memory and imagination. Three friends, including the lorem ipsum other text goes here.',
    // }, {
    //   name: 'Scott Stark',
    //   note: 'Filmmaker',
    //   description: 'Scott Stark has made over 65 films and videos since the early 1980s, and has created numerous installations, performances and photo-collages as well. His work has shown nationally lorem ispuem other stuff'
    // }, {
    //   name: 'Fake Fruit Factory (1986)',
    //   note: 'By Chick Strand',
    //   description: 'Intimate documentary about young women who make papier mache fruit and vegetables in a small factory in Mexico. They have a gringo boss, but the factory is owned by his Mexican wife lorem ipsum and stuff'      
    // }];
    return (
      <div className="HomePage">
        <div className={isScrollNav ? 'isScrollNav active' : 'isScrollNav'}>
          <MainNav isCollapsed={true} />
        </div>
        <Hero active={true}>
          <div className="container padded-container">
            <HomeIntro />
          </div>
        </Hero>
        <div className="container padded-container">
          <Spotlight />
          { events && events.length ?
            [
              <Row key={0}>
                <Col sm="12">
                  <h1 className="lead upcoming-events d-flex">
                    Upcoming events
                    <span className="ml-auto">
                      <Link to="/events">
                        <Button size="default">
                          See all Events
                        </Button>
                      </Link>
                    </span>
                  </h1>
                </Col>
              </Row>
              ,
              <EventTiles key={1} className="single-line" data={events} />
            ]
          : null }

          {
            discoverReady ?
            <Row>
              <Col sm="12">
                <h1 className="lead discover">Discover something new to teach or share</h1>
              </Col>
            </Row>
            : null
          }
          {
            discoverReady ?
            <Row>
              <Col sm="4">
                <DarkBox
                  header="Educator"
                  description="Browse curated classroom content and our library of related writings, videos, and other ephemera as it relates to the works and filmmakers in our catalog."
                />
              </Col>
              <Col sm="4">
                <DarkBox
                  header="Students"
                  description="Learn about the history of our collection of films and filmmakers and how it relates the avant-garde and experimental filmmaking movements from 1921 to the present."
                />
              </Col>
              <Col sm="4">
                <DarkBox
                  header="Curators"
                  description="Browse our curated programs, hand-picked by our staff and board, or explore the collection to curate your own program."
                />
              </Col>
            </Row>
            : null
          }
          {
            news ?
            <h1 className="lead d-flex news">
              News
              <span className="ml-auto">
                <Link to="/news">
                  <Button size="default">
                    Read All News
                  </Button>
                </Link>
              </span>
            </h1>
            : null
          }
          {
            news && news.length ?
            <Row>
              {
                optimalColWidths(news.length).map((colWidth) => (
                  news.slice(0, colWidth).map((d, i) => {
                    return (
                      <Col sm={12 / colWidth} key={i}>
                        <NewsTile {...d} key={i} />
                      </Col>
                    );
                })))
              }
            </Row>
            : null
          }
        </div>
        {
          featuredPosts ?
          <Row className="no-gutters featured-posts">
            {
              optimalColWidths(featuredPosts.length).map((colWidth) => (
                featuredPosts.slice(0, colWidth).map((d, i) => {
                  return (
                    <Col sm={12 / colWidth} key={i}>
                      <FeaturedPost {...d} key={i} />
                    </Col>
                  );
              })))
            }
          </Row>
          : null
        }
      </div>
    );
  }
}

export default withScrollNav(connect(mapStateToProps, mapDispatchToProps)(HomePage));