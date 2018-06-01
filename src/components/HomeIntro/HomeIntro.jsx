import React from 'react';
import { Row, Col } from 'reactstrap';
import './HomeIntro.css';

import BrowseLinksList from '../BrowseLinksList/BrowseLinksList';
import SearchBar from '../SearchBar/SearchBar';

export default () => {
	return (
		<Row className="HomeIntro">
      <Col m="6" className="left">
        <div className="logo-wrapper"><div className="CANYON-CINEMA-50">CANYON CINEMA 50</div></div>
        <SearchBar className="search" placeholder="Search the collection" />
      </Col>
      <Col m="6">
        <div className="divider divider-1" />
        <p className="intro">
          For 50 years, Canyon Cinema has served as one of the world’s preeminent sources for artist-made moving image work, tracing the history of the experimental and avant-garde filmmaking movement from the 1930s to present.
        </p>
        <div className="divider" />
        <div className="browse">BROWSE</div>
        <BrowseLinksList />
      </Col>
    </Row>
	);
};