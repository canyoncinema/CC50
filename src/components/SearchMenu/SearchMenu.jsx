import React, { Component } from 'react';
import './SearchMenu.css';

import CollectionContext from '../../collection-context';
import Caret from '../Caret/Caret';
import SearchMenuItem from './SearchMenuItem';

class SearchMenu extends Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
		this.labelRef = React.createRef();
		this.onOutsideClick = this.onOutsideClick.bind(this);
	}

	state = {
		isOpen: false
	}

	static labels = [
		'All',
		'Films',
		'Filmmakers',
		'Curated Programs',
		'Ephemera'
	]

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

	onOptionSelect(e, labelCb) {
		const label = e.target.innerText;
		this.setState({
			isOpen: false
		});
		labelCb(label);
	}

	render() {
		const { isOpen } = this.state;
		return (
			<CollectionContext.Consumer>
				{
					context => [
						<div
							key={0}
							ref={this.labelRef}
							className={isOpen ? 'SearchMenu open' : 'SearchMenu'}
							onClick={this.toggle.bind(this)}>
							<div className="d-flex label">
								<span className="text">{context.searchLabel}</span>
								<Caret className="ml-auto" direction="down" />
							</div>
						</div>,
						<ul key={1} ref={this.wrapperRef}
								className={isOpen ? 'SearchMenuOptions active' : 'SearchMenuOptions'}>
								{
									SearchMenu.labels.map((label, i) => {
										return (
											<SearchMenuItem
												key={i}
												onClick={(e) =>
													this.onOptionSelect.call(this, e, context.onOptionSelect)}>
												{label}
											</SearchMenuItem>
										);
									})
								}
						</ul>
					]
				}
			</CollectionContext.Consumer>
		);
	}
}

export default SearchMenu;