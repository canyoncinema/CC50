import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Sort.css';

import CollectionContext from '../../collection-context';
import Caret from '../Caret/Caret';
import MenuItem from '../MenuItem/MenuItem';

// SPEC: 'Recently Added' --> 'Recently Added {ItemName}'
const toSortLabel = (label, item) => {
	if (label === 'Recently Added') {
		return label + ' ' + item;
	}
	return label;
}

class Sort extends Component {
	state = {
		isOpen: false
	}

	render() {
		const { values, labels, itemLabel, sortIndex, onSort } = this.props;
		const { isOpen } = this.state;
		return <CollectionContext.Consumer>
			{
				context => !context.searchedText ?
					[
						<div key={0} className="Sort" onClick={() => this.setState({ isOpen: !isOpen })}>
							Sort by: <strong>{toSortLabel(labels[sortIndex], itemLabel)}</strong> <Caret theme="dark" direction="down" />
						</div>,
						<ul key={1} ref={this.wrapperRef}
							className={isOpen ? 'SortMenuOptions active' : 'SortMenuOptions'}>
							{
								labels.map((label, i) => {
									return (
										<MenuItem
											key={i}
											active={i === sortIndex}
											onClick={e => {
												this.setState({
													isOpen: false
												});
												onSort(i, label, values[i]);
											}}>
											<Link to={`?sort=${values[i]}`}>
												{label}
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

Sort.propTypes = {
	labels: PropTypes.array.isRequired,
	values: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired
};

export default Sort;
