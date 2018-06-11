import React, { Component} from 'react';
import { Row } from 'reactstrap';
import Sort from '../Sort/Sort';
import CollectionContext, { toCollectionSearchLabel, toCollectionSort } from '../../collection-context';
import CollectionSection from '../CollectionSection/CollectionSection';
import { filmData, filmmakerData, programData, ephemeraData } from '../../spoof-data';

function getSpoofData(items) {
	if (items === 'films') {
		return filmData;
	} else if (items === 'filmmakers') {
		return filmmakerData;
	} else if (items === 'programs') {
		return programData;
	} else if (items === 'ephemera') {
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
		const { collectionItems, searchedText } = this.props;
		const { sortIndex } = this.state;
		const sort = toCollectionSort(collectionItems);
		console.log('searchedText', searchedText);
		return <CollectionContext.Consumer>
			{
				context => 
				<div className="CollectionPageItem">
					{	!context.searchedText ?
						<Sort
						labels={sort.labels}
						values={sort.values}
						sortIndex={sortIndex}
						onSort={this.onSort}
						itemLabel={toCollectionSearchLabel(collectionItems)} />
						: null
					}
					<CollectionSection searchData={getSpoofData(collectionItems)}/>
				</div>
			}
		</CollectionContext.Consumer>
	}
}

export default CollectionPageItem;