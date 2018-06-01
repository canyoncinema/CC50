import React, { Component } from 'react';
import './Search.css';

import SearchMenu from '../SearchMenu/SearchMenu';
import SearchBar from '../SearchBar/SearchBar';

// TODO: rename to SearchCollection
class Search extends Component {
	render() {
		const { id } = this.props;
		return [
			<SearchMenu key={id + '-0'} />
			,
			<SearchBar key={id + '-1'} />
		];
	}
}

export default Search;