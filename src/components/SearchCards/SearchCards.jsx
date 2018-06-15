import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchCard from '../SearchCard/SearchCard';
import './SearchCards.css';

class SearchCards extends Component {
	render() {
		const { data, customColSize, viewMode, isFilmmakerPage } = this.props;
		return data && data.length ?
			<div className="SearchCards">
			{
				data.map((d, i) =>
					<SearchCard
						key={i}
						isFilmmakerPage={isFilmmakerPage}
						viewMode={viewMode}
						customColSize={customColSize}
						{...d} />
				)
			}
			</div>
			: null;
	}
}

SearchCards.propTypes = {
	data: PropTypes.array.isRequired
}

export default SearchCards;