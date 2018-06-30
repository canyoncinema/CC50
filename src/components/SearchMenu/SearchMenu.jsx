import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchMenu.css';

import Caret from '../Caret/Caret';
import MenuItem from '../MenuItem/MenuItem';

class SearchMenu extends Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
		this.labelRef = React.createRef();
	}

	state = {
		isOpen: false
	}

	static options = [{
		label: 'All',
		collectionItems: null
	}, {
		label: 'Films',
		collectionItems: 'films'
	}, {
		label: 'Filmmakers',
		collectionItems: 'filmmakers'
	}, {
		label: 'Curated Programs',
		collectionItems: 'programs'
	}, {
		label: 'Ephemera',
		collectionItems: 'ephemera'
	}]

	componentDidMount() {
		// TODO: make outside click handling reusable
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

	componentDidUpdate() {
		if (this.state.clearPlaceholder) {
			this.inputRef.current.focus();
		}
	}

	onOutsideClick = (event) => {
		// TODO: make reusable
		const el = this.wrapperRef && this.wrapperRef.current,
			el2 = this.labelRef && this.labelRef.current;
		if (el && !el.contains(event.target) &&
				!el2.contains(event.target)) {
			this.setState({
				isOpen: false
			});
    }
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	onClickOption = (option) => {
		this.setState({
			isOpen: false
		});
		this.props.onOptionSelect(option);
	}

	render() {
		const { isOpen } = this.state;
		const { searchLabel } = this.props;
		return [
				<div
					key={0}
					ref={this.labelRef}
					className={isOpen ? 'SearchMenu open' : 'SearchMenu'}
					onClick={this.toggle.bind(this)}>
					<div className="d-flex label">
						<span className="text">{searchLabel}</span>
						<Caret className="ml-auto" direction="down" />
					</div>
				</div>,
				<ul key={1} ref={this.wrapperRef}
						className={isOpen ? 'SearchMenuOptions active' : 'SearchMenuOptions'}>
						{
							SearchMenu.options.map((option, i) => {
								return (
									<MenuItem
										key={i}
										onClick={(e) => this.onClickOption(option)}>
											{option.label}
									</MenuItem>
								);
							})
						}
				</ul>
			];
	}
}

SearchMenu.propTypes = {
	onOptionSelect: PropTypes.func.isRequired
}

export default SearchMenu;