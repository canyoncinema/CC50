import React from 'react';
import PropTypes from 'prop-types';
import './SearchResultsSummary.css';
import LoadingMessage from "../LoadingMessage/LoadingMessage";

const SearchResultsSummary = ({customText, numResults, searchText}) =>
<div className="SearchResultsSummary">

	{
		numResults === 1 ? <span>{numResults} Result. </span> : null
	}

    {
        numResults > 1 ? <span>{numResults} Results. </span> : null
    }

	{
		customText ? customText :

			<span>Searched: <strong>"{searchText}"</strong></span>
	}

</div>;

SearchResultsSummary.propTypes = {
	numResults: PropTypes.number,
	searchText: PropTypes.string.isRequired
}

export default SearchResultsSummary;
