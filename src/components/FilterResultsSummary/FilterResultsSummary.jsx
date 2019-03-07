import React from 'react';
import PropTypes from 'prop-types';
import './FilterResultsSummary.css';
import LoadingMessage from "../LoadingMessage/LoadingMessage";

const FilterResultsSummary = ({numResults, filtersDisabled}) =>
    <div className="FilterResultsSummary">
        <span>
        {
            numResults === 1 ? <span>{numResults} Result. </span> : null
        }

        {
            numResults > 1 ? <span>{numResults} Results. </span> : null
        }

        &nbsp;Active Filters:&nbsp;
        {
            Object.keys(filtersDisabled).map((f,i)=> {
                if (filtersDisabled[f] === true) {
                    const tag = f.split('__')[1];
                    if (i !== 0 ) {
                        return (<span key={i}><strong>, {tag}</strong></span>)
                    } else { return ( <span key={i}><strong>{tag}</strong></span>) }
                }
            })
        }
        </span>
    </div>;

FilterResultsSummary.propTypes = {
    numResults: PropTypes.number.isRequired,
    filtersDisabled: PropTypes.object
}

export default FilterResultsSummary;
