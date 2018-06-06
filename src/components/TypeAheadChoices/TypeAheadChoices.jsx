import React, { Component } from 'react';
import './TypeAheadChoices.css';

const DEBOUNCE_THRESHOLD = 250;

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
		choiceTypes: []
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
				choiceTypes: [
					'Filmmaker',
					'Film',
					'Ephemera',
					'Film',
					'Film',
					'Filmmaker',
					'Ephemera'
				]
			})
		}, 250);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.searchText.trim() !== this.state.searchText.trim();
	}

	render() {
		const { children, shouldUpdate,
			setChoicesRef, onChoiceSelect,
			searchText
		} = this.props;
		const {
			choiceTexts, choiceTypes,
			choiceMatchStartChars, choiceMatchEndChars
		} = this.state;
		// TODO: proper search label val
		return choiceTexts.map((choiceText, i) => {
					const matchStartChar = choiceMatchStartChars[i],
								matchEndChar = choiceMatchEndChars[i],
								choiceType = choiceTypes[i];
					const matchLength = matchEndChar - matchStartChar + 1;
					return <li
						className="TypeAheadChoice d-flex"
						key={i}
						onClick={e => {
							// TODO: HACK
							onChoiceSelect(null, choiceText, choiceType, true);
						}}>
						<span className="value">
							{choiceText.slice(0, matchStartChar)}
							<span className="match">
								{choiceText.slice(matchStartChar, matchEndChar + 1)}
							</span>
							{choiceText.slice(matchEndChar + 1, choiceText.length)}
						</span>
						<label className="ml-auto">{choiceTypes[i]}</label>
					</li>
				});
	}
}

export default TypeAheadChoices;