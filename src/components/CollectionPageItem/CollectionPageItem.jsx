import React, { Component} from 'react';
import { Row } from 'reactstrap';
import Sort from '../Sort/Sort';
import { toCollectionSearchLabel, toCollectionSort } from '../../collection-context';
import CollectionSection from '../CollectionSection/CollectionSection';
import { filmData, filmmakerData, programData, ephemeraData } from '../../spoof-data';

function getSpoofData(item) {
	if (item === 'films') {
		return filmData;
	} else if (item === 'filmmakers') {
		return filmmakerData;
	} else if (item === 'programs') {
		return programData;
	} else if (item === 'ephemera') {
		return ephemeraData;
	}
}

class CollectionPageItem extends Component {
	state = {
		sortIndex: 0
	}

	onSort = (sortIndex, label, value) => {
		// TODO: change data
		console.warn('TODO: sort data by', value);
		this.setState({
			sortIndex
		});
	}

	render() {
		const { item } = this.props;
		const { sortIndex } = this.state;
		const sort = toCollectionSort(item);
		return <div className="CollectionPageItem">
			<Sort
				labels={sort.labels}
				values={sort.values}
				sortIndex={sortIndex}
				onSort={this.onSort}
				itemLabel={toCollectionSearchLabel(item)} />
			<CollectionSection searchData={getSpoofData(item)}/>
		</div>
	}
}

export default CollectionPageItem;