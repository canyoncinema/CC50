import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TypeAheadChoiceList.css';

const mapStateToProps = state => ({
	choicesCollectionItems: state.typeAheadChoices.collectionItems
});

class TypeAheadChoiceList extends Component {
	componentWillReceiveProps(nextProps) {
		console.log('reeive', nextProps, this.props);
	}

	render() {
		const { searchTextAutocompleted,
			clickedInsideAutocompletedText,
			isTypingSearch,
			choicesCollectionItems,
			collectionItems,
			children,
			setRef
		} = this.props;
		const isOpen = (searchTextAutocompleted &&
										clickedInsideAutocompletedText &&
										choicesCollectionItems === collectionItems) ||
										isTypingSearch;
		return (
			<ul
				ref={setRef}
				className={ isOpen ? 'TypeAheadChoiceList active' : 'TypeAheadChoiceList'}>
				{children}
			</ul>
		);
	}
}

export default connect(mapStateToProps)(TypeAheadChoiceList);