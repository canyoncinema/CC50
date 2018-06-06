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
		clickedInsideAutocompletedText: false
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
		const clickedOnChoice = event.target.parentElement.classList.contains('TypeAheadChoiceList') ||
				event.target.parentElement.parentElement.classList.contains('TypeAheadChoiceList');
		// NOTE: cannot be invoked on choice selection.
		// onChoiceSelect handler needs to be called.
		if (clickedOutsideInput) {
			// TODO: HACK
			console.log('clickedOutsideInput')
			if (clickedOnChoice) {
				this.setState({
					disableInput: true,
					clickedInsideAutocompletedText: false
				});
			} else {
				console.log('did NOT click on choice.')
				this.setState({
					disableInput: true,
					clickedInsideAutocompletedText: false
				});
			}
    }
	}

	setChoicesRef = (ref) => {
		this.choicesRef = ref;
		console.log('choicesRef', this.choicesRef);
	}

	onInsideClick = (event) => {
		console.log('onInsideClick clickedInsideAutocompletedText',
			!!this.props.searchTextAutocompleted)
		this.setState({
			disableInput: false,
			clickedInsideAutocompletedText: !!this.props.searchTextAutocompleted
		});
	}

	render() {
		const {
			searchPlaceholder,
			searchText,
			searchLabel,
			setSearchText,
			searchTextAutocompleted,
			className
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
				onSubmit={() => null}>
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
							onChoiceSelect={setSearchText}
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