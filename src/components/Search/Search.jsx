import React, { Component } from 'react';
import './Search.css';

import SearchMenu from '../SearchMenu/SearchMenu';
import SearchBar from '../SearchBar/SearchBar';

class Search extends Component {
	state = {
		placeholder: 'Search films, filmmakers, curated programs, ephemera'
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
		const { placeholder } = this.state;
		return (
			<div className="Search">
				<SearchMenu onLabelChange={this.onLabelChange.bind(this)} />
				<SearchBar placeholder={placeholder} />
			</div>
		);
	}
}

export default Search;