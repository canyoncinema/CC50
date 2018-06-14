import React, { Component } from 'react';
import './Search.css';

import CollectionContext, { toCollectionSearchLabel, labelToSearchPlaceholder } from '../../collection-context';
import SearchMenu from '../SearchMenu/SearchMenu';
import SearchBar from '../SearchBar/SearchBar';

// TODO: rename to SearchCollection
class Search extends Component {
	render() {
		const { id, collectionItems } = this.props;
		const searchLabel = toCollectionSearchLabel(collectionItems);
		return <CollectionContext.Consumer>
		{
			context => {
			const {
				onOptionSelect, submitSearch,
				searchTextAutocompleted, searchText, setSearchText
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
						searchPlaceholder={labelToSearchPlaceholder[searchLabel]}
						searchText={searchText}
						setSearchText={setSearchText}
						searchLabel={searchLabel}
						submitSearch={submitSearch}
						searchTextAutocompleted={searchTextAutocompleted}
					/>
				];
			}
		}
		</CollectionContext.Consumer>
	}
}

export default Search;