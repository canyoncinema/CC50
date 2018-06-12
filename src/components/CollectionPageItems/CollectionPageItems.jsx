import React, { Component} from 'react';
import Sort from '../Sort/Sort';
import CollectionContext, { toCollectionSearchLabel, toCollectionSort } from '../../collection-context';

import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import CollectionSection from '../CollectionSection/CollectionSection';
import { getSpoofDataList } from '../../spoof-data';

class CollectionPageItems extends Component {
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
		const { collectionItems, viewMode } = this.props;
		const { sortIndex } = this.state;
		const sort = toCollectionSort(collectionItems);
		console.log('CollectionPageItems viewMode', viewMode)
		return <CollectionContext.Consumer>
			{
				context => 
				<div className="CollectionPageItem">
					<ScrollToTopOnMount />
					{	!context.searchedText ?
						<Sort
						labels={sort.labels}
						values={sort.values}
						sortIndex={sortIndex}
						onSort={this.onSort}
						itemLabel={toCollectionSearchLabel(collectionItems)} />
						: null
					}
					<CollectionSection
						viewMode={viewMode} 
						searchData={getSpoofDataList(collectionItems)}/>
				</div>
			}
		</CollectionContext.Consumer>
	}
}

export default CollectionPageItems;