import React, { Component } from 'react';
import './SearchMenu.css';

import Caret from '../Caret/Caret';
import OutsideClickHandler from '../OutsideClickHandler/OutsideClickHandler';
import SearchMenuItem from './SearchMenuItem';

class SearchMenu extends Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
		this.labelRef = React.createRef();
		this.onOutsideClick = this.onOutsideClick.bind(this);
	}

	state = {
		label: 'All',
		isOpen: false
	}

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

	onOutsideClick(event) {
		// TODO: make reusable
		const el = this.wrapperRef && this.wrapperRef.current,
			el2 = this.labelRef && this.labelRef.current;
		// console.log('onOutsideClick', el, event.target, event.target.classList)
		if (el && !el.contains(event.target) &&
				!el2.contains(event.target)) {
			// console.log('clicked outside SearchMenu!')
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
		return [
			<div
				ref={this.labelRef}
				className={isOpen ? 'SearchMenu open' : 'SearchMenu'}
				onClick={this.toggle.bind(this)}>
				<div className="d-flex label">
					<span className="text">{label}</span>
					<Caret className="ml-auto" direction="down" />
				</div>
			</div>,
			<ul ref={this.wrapperRef}
					className={isOpen ? 'SearchMenuOptions active' : 'SearchMenuOptions'}>
					<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>All</SearchMenuItem>
					<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Films</SearchMenuItem>
					<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Filmmakers</SearchMenuItem>
					<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Curated Programs</SearchMenuItem>
					<SearchMenuItem onClick={this.onOptionSelect.bind(this)}>Ephemera</SearchMenuItem>
			</ul>
		];
	}
}

export default SearchMenu;