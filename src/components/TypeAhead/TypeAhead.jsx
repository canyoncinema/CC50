import React, { Component } from 'react';
import './TypeAhead.css';

const DEBOUNCE_THRESHOLD = 250;

class TypeAhead extends Component {
	constructor(props) {
		super(props);
		this.updateDebounced = null;
	}

	state = {
		choiceTexts: [],
		choiceMatchStartChars: [],
		choiceMatchEndChars: []
	}

	componentDidUpdate(prevProps) {
		if (prevProps.searchText === this.props.searchText) {
			return;
		}
		if (this.updateDebounced) {
			clearTimeout(this.updateDebounced);
		}

		this.updateDebounced = setTimeout(() => {
			this.setState({
				// choices: [this.props.searchText, this.props.searchText, this.props.searchText]
				choiceTexts: [
					this.props.searchText + ' choice 1',
					this.props.searchText + ' choice 2',
					this.props.searchText + ' choice 3'
				],
				choiceMatchStartChars: [0, 4, 8],
				choiceMatchEndChars: [3, 7, 12]
			})
		}, 250);
	}

	render() {
		const { children, searchText } = this.props;
		const { choiceTexts, choiceMatchStartChars, choiceMatchEndChars } = this.state;
		const isOpen = searchText.length > 0;
		const clonedChildren = React.cloneElement(children, props => ({
			className: 'TypeAhead input',
			key: 0
		}));

		return [
			clonedChildren,
			<ul key={1}
				className={ isOpen ? 'TypeAhead choices active'
				: 'TypeAhead choices' }>
				{
					choiceTexts.map((choiceText, i) => {
						const matchStartChar = choiceMatchStartChars[i],
									matchEndChar = choiceMatchEndChars[i];
						const matchLength = matchEndChar - matchStartChar + 1;
						console.log('choice match text', choiceText, choiceText.slice(matchStartChar, matchLength), matchLength)
						return <li
							className="d-flex"
							key={'1-' + i}>
							<span className="value">
								{choiceText.slice(0, matchStartChar)}
								<span className="match">
									{choiceText.slice(matchStartChar, matchEndChar + 1)}
								</span>
								{choiceText.slice(matchEndChar + 1, choiceText.length)}
							</span>
							<label className="ml-auto">cool</label>
						</li>
					})
				}
			</ul>
		];
	}
}

export default TypeAhead;