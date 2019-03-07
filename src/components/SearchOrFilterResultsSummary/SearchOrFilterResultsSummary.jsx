import React from 'react';
import PropTypes from 'prop-types';
import './SearchOrFilterResultsSummary.css';
import LoadingMessage from "../LoadingMessage/LoadingMessage";

const SearchOrFilterResultsSummary = ({customText, numResults, searchText, filtersDisabled}) =>
<div className="SearchResultsSummary">
	{
		// customText ? customText
        // : searchText ?
        // <span>{numResults} results for <strong>"{searchText}"</strong></span>
        // : filtersDisabled ?
        // <span>{numResults} results for <strong>"f"</strong></span>
        // : null

		customText ? customText :
			<span>{numResults} results for <strong>"{searchText}"</strong></span>


	}

</div>;

SearchOrFilterResultsSummary.propTypes = {
	numResults: PropTypes.number.isRequired,
	// searchText: PropTypes.string.isRequired
}

export default SearchOrFilterResultsSummary;
