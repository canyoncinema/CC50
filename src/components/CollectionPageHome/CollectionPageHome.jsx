import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionSection from '../CollectionSection/CollectionSection';
import { getFilmmakers } from '../../actions/filmmakers-actions';
import { getFilms } from '../../actions/films-actions';
import { getPrograms } from '../../actions/programs-actions';
import { getSpoofDataList } from '../../spoof-data';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

const mapDispatchToProps = dispatch => ({
  getFilmmakers: (...args) => dispatch(getFilmmakers(...args)),
  getFilms: (...args) => dispatch(getFilms(...args)),
  getPrograms: (...args) => dispatch(getPrograms(...args))

})

const mapStateToProps = state => ({
  films: state.films.data,
  filmmakers: state.filmmakers.data,
  programs: state.programs.data,
  ephemera: state.ephemera.data,

  filmmakersIsLoading: state.filmmakers.isLoading,
  filmmakersError: state.filmmakers.error,
  filmsIsLoading: state.films.isLoading,
  filmsError: state.films.error,
  programsIsLoading: state.programs.isLoading,
  programsError: state.programs.error,
  programsMediaByCsid: state.programs.mediaByCsid,
  ephemeraIsLoading: state.ephemera.isLoading,
  ephemeraError: state.ephemera.error,
});

class CollectionPageHome extends Component {
  componentDidMount() {
    this.props.getFilmmakers({
      pgSz: 3,
      // 'persons:sortBy': 'addedDate+DESC'
    });
    this.props.getFilms({
      pgSz: 3,
      // 'works:sortBy': 'addedDate+DESC'
    });
    this.props.getPrograms({
        pgSz: 3
    });
  }

  render() {
    const {
      viewMode,
      films,
      filmsIsLoading,
      filmsError,
      filmmakers,
      filmmakersIsLoading,
      filmmakersError,
      programs,
      programsIsLoading,
      programsError,
      programsMediaByCsid,
      ephemera,
      ephemeraIsLoading,
      ephemeraError
    } = this.props;
    const ephemeraData = getSpoofDataList('ephemera');
    return <div className="container">
      <ScrollToTopOnMount />
      <CollectionSection key={0}
        className="CollectionPageHomeSection"
        viewMode={viewMode}
        customColSize={viewMode !== 'list' ? 4 : null}
        customColWidth="sm"
        header="Films"
        description="New acquisitions to the Canyon Cinema collection"
        buttonText="See all films"
        buttonLink="/collection/films"
        itemType="film"
        searchData={films}
        isLoading={filmsIsLoading}
        error={filmsError}
      />
      <CollectionSection key={1}
        className="CollectionPageHomeSection"
        viewMode={viewMode}
        customColSize={viewMode !== 'list' ? 4 : null}
        customColWidth="sm"
        header="Filmmakers"
        description="Spotlight on some of Canyon Cinema’s filmmakers"
        buttonText="See all filmmakers"
        buttonLink="/collection/filmmakers"
        itemType="filmmaker"
        searchData={filmmakers}
        isLoading={filmmakersIsLoading}
        error={filmmakersError}
      />
      {
        programs && programs.length ?
        <CollectionSection key={2}
          className="CollectionPageHomeSection"
          viewMode={viewMode}
          customColSize={viewMode !== 'list' ? 4 : null}
          customColWidth="sm"
          header="Curated Programs"
          description="Curated by Canyon Cinema staff, Board of Directors, and Advisory Board"
          buttonText="See all curated programs"
          buttonLink="/collection/programs"
          itemType="program"
          searchData={programs}
          isLoading={programsIsLoading}
          error={programsError}
        />
        : null
      }
      {
        ephemera && ephemera.length ?
        <CollectionSection key={3}
          className="CollectionPageHomeSection"
          viewMode={viewMode}
          customColSize={viewMode !== 'list' ? 4 : null}
          customColWidth="sm"
          header="Recently Added Ephemera"
          description="Printed pieces, photos, stills, videos, and other related materials"
          buttonText="See all ephemera"
          buttonLink="/collection/ephemera"
          itemType="ephemera"
          searchData={ephemera}
          isLoading={ephemeraIsLoading}
          error={ephemeraError}
        />
        : null
      }
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageHome);
