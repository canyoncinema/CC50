import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import './HomeIntro.css';

import { RECEIVED_GHOST_PAGE_INTRO_TEXT } from '../../actionTypes';
import { getGhostContent } from '../../actions/ghost-actions';
import { INTRO_TEXT_TAG } from '../../config';

// import CollectonContext from '../../collection-context';
import BrowseLinksList from '../BrowseLinksList/BrowseLinksList';
import SearchBar from '../SearchBar/SearchBar';
import GhostPostContent from '../GhostPostContent/GhostPostContent';

const mapStateToProps = state => ({
  introText: state.ghostContent.introTextPage,
});

const mapDispatchToProps = dispatch => ({
  getGhostContent: (...args) => dispatch(getGhostContent(...args))
});

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

  componentDidMount() {
    this.props.getGhostContent({
      limit: 1,
      page: INTRO_TEXT_TAG
    }, RECEIVED_GHOST_PAGE_INTRO_TEXT);
  }

  render() {
    const { searchText } = this.state;
    const { introText } = this.props;
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
            {
              introText &&
              <GhostPostContent html={introText.html}>
              </GhostPostContent>
            }
          </p>
          <div className="divider" />
          <div className="browse">BROWSE</div>
          <BrowseLinksList />
        </Col>
      </Row>
  	);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeIntro));