import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getShortIdentifierFromRefName } from './../../utils/parse-data';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import SearchCard from '../SearchCard/SearchCard';

const mapStateToProps = (state, myProps) => ({
	film: state.eventDetail.films.get(myProps.filmRefName) &&
		state.eventDetail.films.get(myProps.filmRefName).data || {}
});

class EventDetailFilm extends Component {
	componentDidMount() {
	}
	render() {
		const { film } = this.props;
        if (film.isLoading) {
			return <LoadingMessage />
		}
		if (film.error) {
			return <ErrorMessage />
		}
		return film && film.refName ?
			<SearchCard
				itemType="film"
				viewMode="list"
				shortIdentifier={getShortIdentifierFromRefName(film.refName)}
				isItemPageFilmCard={true}
				showFilmFilmmaker={true}
				data={film}
			/>
			: null
	}
}

export default connect(mapStateToProps)(EventDetailFilm);