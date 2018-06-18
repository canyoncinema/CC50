import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionSection from '../CollectionSection/CollectionSection';
import { getFilmmakers } from '../../actions/filmmakers-actions';
import { getSpoofDataList } from '../../spoof-data';

const mapDispatchToProps = dispatch => ({
  getFilmmakers: () => dispatch(getFilmmakers())
})

const mapStateToProps = state => ({
  filmmakers: state.filmmakers
});

class CollectionPageHome extends Component {
  componentDidMount() {
    this.props.getFilmmakers();
  }

  render() {
    const { viewMode } = this.props;
  	return [
  		<CollectionSection key={0}
        viewMode={viewMode}
        header="Recently Added Films"
        description="New acquisitions to the Canyon Cinema collection"
        buttonText="See all films"
        buttonLink="/collection/films"
        searchData={getSpoofDataList('films')}
      />,
      <CollectionSection key={1}
        viewMode={viewMode}
        header="Recently Added Filmmakers"
        description="Spotlight on some of Canyon Cinema’s filmmakers"
        buttonText="See all filmmakers"
        buttonLink="/collection/filmmakers"
        searchData={getSpoofDataList('filmmakers')}
      />,
      <CollectionSection key={2}
        viewMode={viewMode}
        header="Recently Added Curated Programs"
        description="Curated by Canyon Cinema staff, Board of Directors, and Advisory Board"
        buttonText="See all curated programs"
        buttonLink="/collection/programs"
        searchData={getSpoofDataList('programs')}
      />,
      <CollectionSection key={3}
        viewMode={viewMode}
        header="Recently Added Ephemera"
        description="Printed pieces, photos, stills, videos, and other related materials"
        buttonText="See all ephemera"
        buttonLink="/collection/ephemera"
        searchData={getSpoofDataList('ephemera')}
      />
  	];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageHome);
