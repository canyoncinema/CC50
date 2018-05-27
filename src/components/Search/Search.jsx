import React, { Component } from 'react';
import './Search.css';

import SearchMenu from '../SearchMenu/SearchMenu';
import SearchBar from '../SearchBar/SearchBar';

class Search extends Component {
	state = {
		placeholder: 'Search films, filmmakers, curated programs, ephemera',
		clearPlaceholder: false
	}

	onLabelChange(label) {
		this.setState({
			placeholder: 'Search ' +
				(label === 'All' ?
					'films, filmmakers, curated programs, ephemera'
					: label.toLowerCase()
				) 
		});
	}

	render() {
		const { placeholder, clearPlaceholder } = this.state;
		return [
			<SearchMenu key={0} onLabelChange={this.onLabelChange.bind(this)} />,
			<SearchBar key={1} placeholder={placeholder} />
		];
	}
}

export default Search;