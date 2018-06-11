import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

import { FILMS_SEARCH_LABEL, EPHEMERA_SEARCH_LABEL } from '../../collection-context';
import IconSearch from '../Icon/IconSearch';
import SearchFilter from '../SearchFilter/SearchFilter';
import TypeAheadChoiceList from '../TypeAheadChoiceList/TypeAheadChoiceList';
import TypeAheadChoices from '../TypeAheadChoices/TypeAheadChoices';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
		this.choicesRef = React.createRef();
		this.wrapperRef = this.inputRef;
	}

	state = {
		disableInput: true,
		clickedInside: false,
		clickedInsideAutocompletedText: false,
		submittedSearchText: ''
	}

	componentDidMount() {
		// TODO: make outside click handling reusable
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

	componentDidUpdate() {
		if (!this.state.disableInput) {
			this.inputRef.current.focus();
		}
	}

	onOutsideClick = (event) => {
		// TODO: make reusable
		// created with React#createRef -> el is accessible via current
		const inputEl = this.inputRef && this.inputRef.current;
		const choicesEl = this.choicesRef;
		const clickedOutsideInput = inputEl && !inputEl.contains(event.target);
		const clickedOnChoice = event.target.parentElement && (event.target.parentElement.classList.contains('TypeAheadChoiceList') ||
				event.target.parentElement.parentElement && event.target.parentElement.parentElement.classList.contains('TypeAheadChoiceList'));
		// NOTE: cannot be invoked on choice selection.
		// onChoiceSelect handler needs to be called.
		if (clickedOutsideInput) {
			console.log('clickedOnChoice', clickedOnChoice);
			// TODO: HACK
			if (!clickedOnChoice) {
				// this.setState({
				// 	disableInput: true,
				// 	clickedInsideAutocompletedText: false
				// });
				this.setState({
					disableInput: true,
					clickedInsideAutocompletedText: false
				});
			}
    }
	}

	setChoicesRef = (ref) => {
		this.choicesRef = ref;
	}

	onInsideClick = (event) => {
		this.setState({
			disableInput: false,
			clickedInsideAutocompletedText: !!this.props.searchTextAutocompleted
		});
	}

	// submitSearch = (text, label) => {
	// 	console.log('submit searchText', text, label);
	// 	// TODO: submit search!
	// 	this.setState({
	// 		disableInput: true,
	// 		clickedInsideAutocompletedText: false,
	// 		submittedSearchText: text
	// 	})
	// }

	render() {
		const {
			searchPlaceholder,
			searchText,
			searchLabel,
			setSearchText,
			searchTextAutocompleted,
			className,
			submitSearch
		} = this.props;
		const { disableInput, clickedInside, clickedInsideAutocompletedText } = this.state;
		const clearPlaceholder = !disableInput;
		// TODO: handle submit
		return (
			<form
				className={[
					'SearchBar',
					className,
					!disableInput ? 'active' : null
				].join(' ')}
				onSubmit={(e) => {
					e.preventDefault();
					submitSearch(searchText, searchLabel);
				}}>
				<IconSearch />
				<div className="input-wrapper"
					onClick={this.onInsideClick}>
					<input
						type="text"
						className="TypeAhead input"
						ref={this.inputRef}
						value={searchText}
						onChange={setSearchText}
						disabled={disableInput}
						placeholder={clearPlaceholder ? '' : searchPlaceholder}
					/>
					<TypeAheadChoiceList
						setRef={this.setChoicesRef}
						isOpen={searchTextAutocompleted ?
								clickedInsideAutocompletedText :
								!disableInput && searchText.length > 0}>
						<TypeAheadChoices
							searchText={searchText}
							onChoiceSelect={submitSearch}
						/>
					</TypeAheadChoiceList>
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