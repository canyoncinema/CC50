import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionSection from '../CollectionSection/CollectionSection';
import { getFilmmakers } from '../../actions/filmmakers-actions';
import { getFilms } from '../../actions/films-actions';
import { getSpoofDataList } from '../../spoof-data';

const mapDispatchToProps = dispatch => ({
  getFilmmakers: () => dispatch(getFilmmakers()),
  getFilms: () => dispatch(getFilms())
})

const mapStateToProps = state => ({
  filmmakerData: state.filmmakers.data,
  filmData: state.films.data
});

class CollectionPageHome extends Component {
  componentDidMount() {
    this.props.getFilmmakers();
    this.props.getFilms();
  }

  render() {
    const {
      viewMode,
      filmmakerData,
      filmData
    } = this.props;
    const programData = getSpoofDataList('programs'),
          ephemeraData = getSpoofDataList('ephemera');
  	return [
  		filmData && filmData.length ?
        <CollectionSection key={0}
          viewMode={viewMode}
          header="Recently Added Films"
          description="New acquisitions to the Canyon Cinema collection"
          buttonText="See all films"
          buttonLink="/collection/films"
          itemType="film"
          searchData={filmData}
        /> : null,
      filmmakerData && filmmakerData.length ?
      <CollectionSection key={1}
        viewMode={viewMode}
        header="Recently Added Filmmakers"
        description="Spotlight on some of Canyon Cinema’s filmmakers"
        buttonText="See all filmmakers"
        buttonLink="/collection/filmmakers"
        itemType="filmmaker"
        searchData={filmmakerData}
      /> : null,
      programData && programData.length ?
      <CollectionSection key={2}
        viewMode={viewMode}
        header="Recently Added Curated Programs"
        description="Curated by Canyon Cinema staff, Board of Directors, and Advisory Board"
        buttonText="See all curated programs"
        buttonLink="/collection/programs"
        itemType="program"
        searchData={programData}
      /> : null,
      ephemeraData && ephemeraData.length ?
      <CollectionSection key={3}
        viewMode={viewMode}
        header="Recently Added Ephemera"
        description="Printed pieces, photos, stills, videos, and other related materials"
        buttonText="See all ephemera"
        buttonLink="/collection/ephemera"
        itemType="ephemera"
        searchData={ephemeraData}
      /> : null
  	];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageHome);
