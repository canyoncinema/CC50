import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TypeAheadChoices.css';
import { updateQueryString } from '../../utils/query-string';
import { getDisplayNameFromRefName,
	getShortIdentifierFromRefName,
	collectionItemsToSingularTitlecased } from '../../utils/parse-data';
import { getChoices } from '../../actions/typeahead-choices-actions';
import { history } from '../../store';
import {
	ALL_SEARCH_LABEL,
	FILMS_SEARCH_LABEL,
	FILMMAKERS_SEARCH_LABEL,
	PROGRAMS_SEARCH_LABEL,
	EPHEMERA_SEARCH_LABEL,
	toCollectionSearchVal
} from '../../collection-context';

const mapStateToProps = state => ({
	choices: state.typeAheadChoices.data,
	choicesCollectionItems: state.typeAheadChoices.collectionItems
});

const mapDispatchToProps = dispatch => ({
	getChoices: (collectionItems, choiceText) =>
		dispatch(getChoices(collectionItems, choiceText))
});

class TypeAheadChoices extends Component {
	constructor(props) {
		super(props);
		this.updateDebounced = null;
		this.choicesRef = React.createRef();
	}

	state = {
		searchText: '',
		choiceTexts: [],
		choiceMatchStartChars: [],
		choiceMatchEndChars: [],
		choiceSearchLabels: []
	}

	componentDidUpdate(prevProps) {
		if (this.updateDebounced) {
			clearTimeout(this.updateDebounced);
		}

		this.updateDebounced = setTimeout(() => {
			if (prevProps.searchText === this.props.searchText) return;
			// execute search
			this.props.getChoices(
				this.props.collectionItems,
				this.props.searchText
			);
		}, 250);
	}

	componentWillUnmount() {
		if (this.updateDebounced) {
			clearTimeout(this.updateDebounced);
		}
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.searchText ?
			nextProps.searchText.trim() !== this.state.searchText.trim() : false;
	}

	render() {
		// onChoiceSelect(choice.termDisplayName, this.props.collectionItems)
		const { numChoices, collectionItems, choicesCollectionItems,
			onChoiceSelect, setChoicesCollectionItems,
			choices, searchText } = this.props;
		const {
			choiceTexts, choiceSearchLabels,
			choiceMatchChars
		} = this.state;
		return (choices || []).map(choice => {
			choice.matchChar = {
				start: choice.termDisplayName.toLowerCase().indexOf(searchText.toLowerCase()),
				end: choice.termDisplayName.toLowerCase().indexOf(searchText.toLowerCase()) + searchText.length - 1
			};
			return choice;
		})
		.slice(0, numChoices)
		.map((choice, i) => {
			return (
				<li
					className="TypeAheadChoice d-flex"
					key={i}
					title={`${collectionItemsToSingularTitlecased(collectionItems)}: ${choice.termDisplayName}`}
					onClick={(e) => {
						e.stopPropagation();
						const path = `/collection/${collectionItems}/${getShortIdentifierFromRefName(choice.refName)}`;
						history.push(path);
					}}
				>
					<span className="value">
						{choice.termDisplayName.slice(0, choice.matchChar.start)}
						<span className="match">
							{choice.termDisplayName.slice(choice.matchChar.start, choice.matchChar.end + 1)}
						</span>
						{choice.termDisplayName.slice(choice.matchChar.end + 1, choice.termDisplayName.length)}
					</span>
					<label className="ml-auto">{collectionItemsToSingularTitlecased(collectionItems)}</label>
				</li>
			);
		})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeAheadChoices);
