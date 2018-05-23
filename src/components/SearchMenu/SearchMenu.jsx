import React, { Component } from 'react';
import './SearchMenu.css';

import Caret from '../Caret/Caret';
import OutsideClickHandler from '../OutsideClickHandler/OutsideClickHandler';
import SearchMenuItem from './SearchMenuItem';

class SearchMenu extends Component {
	state = {
		label: 'All',
		isOpen: false
	}

	toggle() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	onOptionSelect(e) {
		const label = e.target.innerText;
		this.setState({
			label,
			isOpen: false
		});
		if (this.props.onLabelChange) this.props.onLabelChange(label);
	}

	render() {
		const { label, isOpen } = this.state;
		return (
			<OutsideClickHandler isDisabled={!isOpen}>
				<div>
					<div className="SearchMenu" onClick={this.toggle.bind(this)}>
						<div className="label">
							<span className="text">{label}</span><Caret direction={isOpen ? 'up' : 'down'} />
						</div>
					</div>
					<ul className={isOpen ? 'SearchMenuOptions active' : 'SearchMenuOptions'}>
							<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>All</SearchMenuItem>
							<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Films</SearchMenuItem>
							<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Filmmakers</SearchMenuItem>
							<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Curated Programs</SearchMenuItem>
							<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Ephemera</SearchMenuItem>
					</ul>
				</div>
			</OutsideClickHandler>
		);
	}
}

export default SearchMenu;