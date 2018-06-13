import React, { Component } from 'react';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import SearchCard from '../SearchCard/SearchCard';
import './SearchCards.css';

class SearchCards extends Component {
	render() {
		const { data, customColSize, viewMode, searchLabel } = this.props;
		return data && data.length ?
			<div className="SearchCards">
			{
				data.map((d, i) =>
					<SearchCard
						key={i}
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