import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionSection from '../CollectionSection/CollectionSection';
import { Row, Col } from 'reactstrap';
import { getFilmmakers } from '../../actions/filmmakers-actions';
import { getFilms } from '../../actions/films-actions';
import { getPrograms } from '../../actions/programs-actions';
import { getGhostContent } from '../../actions/ghost-actions';
import { getSpoofDataList } from '../../spoof-data';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import NewsTile from "../NewsTile/NewsTile";
import {Link} from "react-router-dom";
import Button from "../Button/Button";

const mapDispatchToProps = dispatch => ({
  getFilmmakers: (...args) => dispatch(getFilmmakers(...args)),
  getFilms: (...args) => dispatch(getFilms(...args)),
  getPrograms: (...args) => dispatch(getPrograms(...args)),
  getGhostContent: (...args) => dispatch(getGhostContent(...args))
})

const mapStateToProps = state => ({
  films: state.films.data,
  filmmakers: state.filmmakers.data,
  programs: state.programs.data,
  filmmakersIsLoading: state.filmmakers.isLoading,
  filmmakersError: state.filmmakers.error,
  filmsIsLoading: state.films.isLoading,
  filmsError: state.films.error,
  programsIsLoading: state.programs.isLoading,
  programsError: state.programs.error,
  programsMediaByCsid: state.programs.mediaByCsid,
  ephemera: state.ghostContent.ephemera,
  ephemeraIsLoading: state.ghostContent.isLoading,
  ephemeraError: state.ghostContent.error,
});

class CollectionPageHome extends Component {
  componentDidMount() {
    this.props.getFilmmakers({
      pgSz: 3,
    });
    this.props.getFilms({
      pgSz: 3,
    });
    this.props.getPrograms({
        pgSz: 3
    });
    this.props.getGhostContent({
        limit: 3,
        type: 'ephemera',
        page: 1
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
    // TODO: this sucks and is a hack for Ephemera
      return <div className="container">
      <ScrollToTopOnMount />
      {
        ephemera && ephemera.length &&
        <div className="CollectionSection col-xs-4">
        <header className="section-header d-flex">
            <div>
                <h3>Ephemera</h3>
                <p>
                    Original writing, program notes, video, and artwork related to the Canyon Cinema collection
                </p>
            </div>
            <Link className="ml-auto" to="/collection/ephemera">
                <Button size="default">
                    See all Ephemera
                </Button>
            </Link>
        </header>
          <Row>
            {
                ephemera.map((d, i) => {
                    return <Col sm={4} key={i}>
                        <NewsTile {...d} key={i} type="ephemera" linkBase="/collection/ephemera"/>
                    </Col>
                })
            }
          </Row>
        </div>
      }
      {
        programs && programs.length ?
        <CollectionSection key={2}
          className="CollectionPageHomeSection"
          viewMode={viewMode}
          customColSize={viewMode !== 'list' ? 4 : null}
          customColWidth="sm"
          header="Curated Programs"
          description="Curated for the international Canyon Cinema 50 Tour"
          buttonText="See all curated programs"
          buttonLink="/collection/programs"
          itemType="program"
          searchData={programs}
          isLoading={programsIsLoading}
          error={programsError}
        />
        : null
      }
      <CollectionSection key={3}
        className="CollectionPageHomeSection"
        viewMode={viewMode}
        customColSize={viewMode !== 'list' ? 4 : null}
        customColWidth="sm"
        header="Films"
        description="Titles featured in Canyon Cinema 50 and beyond"
        buttonText="See all films"
        buttonLink="/collection/films"
        itemType="film"
        searchData={films}
        isLoading={filmsIsLoading}
        error={filmsError}
      />
      <CollectionSection key={4}
        className="CollectionPageHomeSection"
        viewMode={viewMode}
        customColSize={viewMode !== 'list' ? 4 : null}
        customColWidth="sm"
        header="Filmmakers"
        description="Filmmakers included in Canyon Cinema 50 and ongoing public programming"
        buttonText="See all filmmakers"
        buttonLink="/collection/filmmakers"
        itemType="filmmaker"
        searchData={filmmakers}
        isLoading={filmmakersIsLoading}
        error={filmmakersError}
      />
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPageHome);
