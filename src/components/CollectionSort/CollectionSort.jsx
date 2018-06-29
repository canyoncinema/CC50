import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	openSort,
	closeSort,
	initSort,
	onSort
} from '../../actions/collection-sort-actions';
import './CollectionSort.css';

import CollectionContext from '../../collection-context';
import Caret from '../Caret/Caret';
import MenuItem from '../MenuItem/MenuItem';

// SPEC: 'Recently Added' --> 'Recently Added {ItemName}'
const toSortLabel = (label, item) => {
	if (label === 'Recently Added') {
		return label + ' ' + item;
	}
	return label;
};

const toCollectionSortOptions = (collectionItems, itemLabel) => {
	collectionItems = collectionItems.toLowerCase();
	if (collectionItems === 'filmmakers' ||
			collectionItems === 'programs') {
		// TODO: REAL VALUES
		return [{
			value: 'addedDate+DESC',
			label: 'Recently Added'
		}, {
			value: 'title',
			label: 'Alphabetical'
		}];
	} else if (collectionItems === 'films') {
		return [{
			value: 'addedDate+DESC',
			label: 'Recently Added'
		}, {
			value: 'title',
			label: 'Alphabetical (Title)'
		}, {
			value: 'filmmaker',
			label: 'Alphabetical (Filmmaker)'
		}, {
			value: '-producedAt',
			label: 'Production Date (New to Old)'
		}, {
			value: 'producedAt',
			label: 'Production Date (Old to New)'
		}];
	} else if (collectionItems === 'ephemera') {
		return [{
			value: 'addedDate+DESC',
			label: 'Recently Added'
		}, {
			value: 'random',
			label: 'Random'
		}];
	} else {
		throw new Error('Invalid collectionItems ' + collectionItems);
	}
};

const mapStateToProps = state => ({
	isOpen: state.collectionSort.isOpen,
	activeOption: state.collectionSort.activeOption
});

const mapDispatchToProps = dispatch => ({
	openSort: () => dispatch(openSort()),
	closeSort: () => dispatch(closeSort()),
	initSort: () => dispatch(initSort()),
	onSort: (sortOption) => dispatch(onSort(sortOption))
});

class CollectionSort extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.collectionItems !== this.props.collectionItems) {
			this.props.initSort();
		}
	}

	componentWillUnmount() {
		// reset 
		this.props.initSort();
	}

	render() {
		const { isOpen, activeOption,
			collectionItems, itemLabel,
			openSort, closeSort, onSort } = this.props;
    const sortOptions = toCollectionSortOptions(collectionItems, itemLabel);
		return <CollectionContext.Consumer>
			{
				context => !context.searchedText ?
					[
						<div key={0} className="Sort" onClick={() =>
							isOpen ? closeSort() : openSort()}>
							Sort by: <strong>{toSortLabel(activeOption.label, itemLabel)}</strong> <Caret theme="dark" direction="down" />
						</div>,
						<ul key={1} ref={this.wrapperRef}
							className={isOpen ? 'SortMenuOptions active' : 'SortMenuOptions'}>
							{
								sortOptions.map((option, i) => {
									return (
										<MenuItem
											key={i}
											active={option.value === activeOption.value}
											onClick={() => onSort(option)}>
											<Link to={`?sort=${option.value}`}>
												{option.label}
											</Link>
										</MenuItem>
									);
								})
							}
						</ul>
					]
					: null
			}
		</CollectionContext.Consumer>
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionSort);
