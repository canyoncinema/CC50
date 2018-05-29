import React, { Component } from 'react';
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

export default SearchCards;