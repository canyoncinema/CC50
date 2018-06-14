import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './HomeIntro.css';

// import CollectonContext from '../../collection-context';
import BrowseLinksList from '../BrowseLinksList/BrowseLinksList';
import SearchBar from '../SearchBar/SearchBar';

class HomeIntro extends Component {
  constructor(props) {
    super(props);
    this.setSearchText = this.setSearchText.bind(this);
  }

  state = {
    searchText: ''
  }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  submitSearch = (searchText) => {
    this.props.history.push('/collection?search=' + encodeURIComponent(searchText));
  }

  render() {
    const { searchText } = this.state;
  	return (
  		<Row className="HomeIntro">
        <Col m="6" className="left">
          <div className="logo-wrapper"><div className="CANYON-CINEMA-50">CANYON CINEMA 50</div></div>
          <SearchBar
            className="search"
            searchPlaceholder="Search the collection"
            setSearchText={this.setSearchText}
            searchText={searchText}
            submitSearch={this.submitSearch}
          />
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
  }
}

export default withRouter(HomeIntro);