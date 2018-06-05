import React, { Component } from 'react';
import './Search.css';

import CollectionContext from '../../collection-context';
import SearchMenu from '../SearchMenu/SearchMenu';
import SearchBar from '../SearchBar/SearchBar';

// TODO: rename to SearchCollection
class Search extends Component {
	render() {
		const { id } = this.props;
		return <CollectionContext.Consumer>
		{
			context => {
			const {
				searchLabel, onOptionSelect,
				searchPlaceholder, searchText, setSearchText
			} = context;
				return [
					<SearchMenu
						key={id + '-0'}
						searchLabel={searchLabel}
						onOptionSelect={onOptionSelect}
					/>
					,
					<SearchBar
						key={id + '-1'}
						searchPlaceholder={searchPlaceholder}
						searchText={searchText}
						setSearchText={setSearchText}
						searchLabel={searchLabel}
					/>
				];
			}
		}
		</CollectionContext.Consumer>
	}
}

export default Search;