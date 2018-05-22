import React, { Component } from 'react';
import './SearchMenu.css';

import Caret from '../Caret/Caret';
import SearchMenuItem from './SearchMenuItem';

class SearchMenu extends Component {
	state = {
		label: 'All',
		isOpen: false
	}

	onOpen() {
		this.setState({ isOpen: true });
	}

	onOptionSelect(e) {
		this.setState({
			label: e.target.innerText,
			isOpen: false
		});
	}

	render() {
		const { label, isOpen } = this.state;
		return (
			[<div className="SearchMenu" onClick={this.onOpen.bind(this)}>
				<span className="label">
					<span className="text">{label}</span><Caret />
				</span>
			</div>,
			<ul className={isOpen ? 'SearchMenuOptions active' : 'SearchMenuOptions'}>
				<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>All</SearchMenuItem>
				<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Films</SearchMenuItem>
				<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Filmmakers</SearchMenuItem>
				<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Curated Programs</SearchMenuItem>
				<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Ephemera</SearchMenuItem>
			</ul>
			]
		);
	}
}

export default SearchMenu;