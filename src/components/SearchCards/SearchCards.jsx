import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CollectionContext from '../../collection-context';
import SearchCard from '../SearchCard/SearchCard';

class SearchCards extends Component {
	render() {
		const { data } = this.props;
		return (
			<CollectionContext.Consumer>
				{
					context =>
					data && data.length ?
					data.map((d, i) => {
					return (
							<SearchCard key={i} viewMode={context.viewMode} {...d} />
						);
					})
					: null
				}
			</CollectionContext.Consumer>
		);
	}
}

SearchCards.propTypes = {
	data: PropTypes.array.isRequired
}

export default SearchCards;