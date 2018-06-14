import React, { Component } from 'react';
import './TypeAheadChoices.css';
import { updateQueryString } from '../../utils/query-string';
import {
	ALL_SEARCH_LABEL,
	FILMS_SEARCH_LABEL,
	FILMMAKERS_SEARCH_LABEL,
	PROGRAMS_SEARCH_LABEL,
	EPHEMERA_SEARCH_LABEL,
	toCollectionSearchVal
} from '../../collection-context';

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

	componentDidUpdate() {
		if (this.updateDebounced) {
			clearTimeout(this.updateDebounced);
		}

		this.updateDebounced = setTimeout(() => {
			this.setState({
				// choices: [this.props.searchText, this.props.searchText, this.props.searchText]
				searchText: this.props.searchText,
				choiceTexts: [
					this.props.searchText + ' choice 1',
					this.props.searchText + ' choice 2',
					this.props.searchText + ' choice 3',
					this.props.searchText + ' choice 4',
					this.props.searchText + ' choice 5',
					this.props.searchText + ' choice 6',
					this.props.searchText + ' choice 7'
				],
				choiceMatchStartChars: [0, 4, 8, 1, 3, 2, 5],
				choiceMatchEndChars: [3, 7, 12, 13, 9, 13, 9],
				choiceSearchLabels: [ // TODO: THIS IS PLURAL == SEARCH LABELS
					FILMMAKERS_SEARCH_LABEL,
					FILMS_SEARCH_LABEL,
					EPHEMERA_SEARCH_LABEL,
					FILMS_SEARCH_LABEL,
					FILMS_SEARCH_LABEL,
					FILMMAKERS_SEARCH_LABEL,
					EPHEMERA_SEARCH_LABEL
				]
			})
		}, 250);
	}

	shouldComponentUpdate(nextProps) {
		console.log('shouldComponentUpdate', nextProps.searchText, this.state.searchText);
		return nextProps.searchText ?
			nextProps.searchText.trim() !== this.state.searchText.trim() : false;
	}

	render() {
		const { onChoiceSelect } = this.props;
		const {
			choiceTexts, choiceSearchLabels,
			choiceMatchStartChars, choiceMatchEndChars
		} = this.state;
		console.log('choiceTexts', choiceTexts);
		// TODO: proper search label val
		return choiceTexts.map((choiceText, i) => {
					const matchStartChar = choiceMatchStartChars[i],
								matchEndChar = choiceMatchEndChars[i],
								choiceLabel = choiceSearchLabels[i];
					return <li
						className="TypeAheadChoice d-flex"
						key={i}
						onClick={e => {
							// TODO: HACK
							const url = '/collection/' +
							toCollectionSearchVal(choiceLabel) + '?' +
							updateQueryString(window.location.search, {
								search: encodeURIComponent(choiceText)
							});
							onChoiceSelect(choiceText, choiceLabel);
						}}>
						<span className="value">
							{choiceText.slice(0, matchStartChar)}
							<span className="match">
								{choiceText.slice(matchStartChar, matchEndChar + 1)}
							</span>
							{choiceText.slice(matchEndChar + 1, choiceText.length)}
						</span>
						<label className="ml-auto">{choiceSearchLabels[i]}</label>
					</li>
				});
	}
}

export default TypeAheadChoices;