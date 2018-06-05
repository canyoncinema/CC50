import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

import { FILMS_SEARCH_LABEL, EPHEMERA_SEARCH_LABEL } from '../../collection-context';
import IconSearch from '../Icon/IconSearch';
import SearchFilter from '../SearchFilter/SearchFilter';
import TypeAhead from '../TypeAhead/TypeAhead';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
		this.wrapperRef = this.inputRef;

		this.onOutsideClick = this.onOutsideClick.bind(this);
		this.onInsideClick = this.onInsideClick.bind(this);
	}

	state = {
		clearPlaceholder: false
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
		const el = this.inputRef && this.inputRef.current;
		if (el && !el.contains(event.target)) {
			this.setState({
				clearPlaceholder: false
			});
    }
	}

	onInsideClick(event) {
		console.log('onInsideClick, clear placeholder')
		this.setState({
			clearPlaceholder: true
		});
	}

	render() {
		const {
			searchPlaceholder,
			searchText,
			searchLabel,
			setSearchText,
			className
		} = this.props;
		const { clearPlaceholder } = this.state;
		// TODO: handle submit
		return (
			<form
				className={[
					'SearchBar',
					className,
					clearPlaceholder ? 'active' : null
				].join(' ')}
				onSubmit={() => null}>
				<IconSearch />
				<div className="input-wrapper"
					onClick={this.onInsideClick}>
					<TypeAhead searchText={searchText}>
						<input
							ref={this.inputRef}
							type="text"
							className="input"
							value={searchText}
							onChange={setSearchText}
							disabled={!clearPlaceholder}
							placeholder={clearPlaceholder ? '' : searchPlaceholder}
						/>
					</TypeAhead>
				</div>
				{
					searchLabel === FILMS_SEARCH_LABEL ||
					searchLabel === EPHEMERA_SEARCH_LABEL ?
					<SearchFilter searchLabel={searchLabel} />
					: null
				}
			</form>
		);
	}
}

// TODO: optimize SearchFilter disapparance (make CSS only)

SearchBar.propTypes = {
	searchText: PropTypes.string.isRequired,
	searchPlaceholder: PropTypes.string.isRequired,
	setSearchText: PropTypes.func.isRequired
};

export default SearchBar;