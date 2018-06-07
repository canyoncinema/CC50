import React from 'react';
import PropTypes from 'prop-types';
import './SearchResultsSummary.css';

const SearchResultsSummary = ({customText, numResults, searchText}) =>
<div className="SearchResultsSummary">
	{
		customText ? customText :
		<span>{numResults} results for <strong>"{searchText}"</strong></span>
	}
</div>;

SearchResultsSummary.propTypes = {
	numResults: PropTypes.number.isRequired,
	searchText: PropTypes.string.isRequired
}

export default SearchResultsSummary;
