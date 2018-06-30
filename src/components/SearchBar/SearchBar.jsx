import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChoices } from '../../actions/typeahead-choices-actions';
import PropTypes from 'prop-types';
import './SearchBar.css';

import { FILMS_SEARCH_LABEL, EPHEMERA_SEARCH_LABEL } from '../../collection-context';
import IconSearch from '../Icon/IconSearch';
import SearchFilter from '../SearchFilter/SearchFilter';
import TypeAheadChoiceList from '../TypeAheadChoiceList/TypeAheadChoiceList';
import TypeAheadChoices from '../TypeAheadChoices/TypeAheadChoices';

const mapStateToProps = state => ({
	choicesCollectionItems: state.typeAheadChoices.collectionItems
});

const mapDispatchToProps = dispatch => ({
	getChoices: (...args) => dispatch(getChoices(...args))
})

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
		const clickedOutsideInput = inputEl && !inputEl.contains(event.target);
		const clickedOnChoice = event.target.parentElement &&
			(
				event.target.parentElement.classList.contains('TypeAheadChoiceList') ||
				event.target.parentElement.parentElement && event.target.parentElement.parentElement.classList.contains('TypeAheadChoiceList')
			);
		// NOTE: cannot be invoked on choice selection.
		// onChoiceSelect handler needs to be called.
		if (clickedOutsideInput) {
			// TODO: HACK
			if (!clickedOnChoice) {
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
		if (this.state.disableInput ||
			this.state.clickedInsideAutocompletedText == !this.props.searchTextAutocompleted) {
			this.setState({
				disableInput: false,
				clickedInsideAutocompletedText: !!this.props.searchTextAutocompleted
			});
		}
		if (this.props.searchText &&
				this.props.collectionItems !== this.props.choicesCollectionItems) {
			// clicked into typed search, after changing collection type
			// to query over; re-execute get search choices on new collection
			this.props.getChoices(
				this.props.collectionItems,
				this.props.searchText
			);
		}
	}

	render() {
		const {
			searchPlaceholder,
			searchText,
			searchLabel,
			collectionItems,
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
					submitSearch(searchText, collectionItems);
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
						collectionItems={collectionItems}
						setRef={this.setChoicesRef}
						searchTextAutocompleted={searchTextAutocompleted}
						clickedInsideAutocompletedText={clickedInsideAutocompletedText}
						isTypingSearch={!disableInput && searchText.length > 0}
						>
						<TypeAheadChoices
							numChoices={7}
							collectionItems={collectionItems}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);