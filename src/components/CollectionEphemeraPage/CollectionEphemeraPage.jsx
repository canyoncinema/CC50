import React, { Component } from 'react';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import CollectionItemHeader from '../CollectionItemHeader/CollectionItemHeader';
import { getSpoofDataObj } from '../../spoof-data';

class CollectionEphemeraPage extends Component {
	render() {
		const { collectionItems, itemId, isScrollNav } = this.props;
		const item = getSpoofDataObj(collectionItems, itemId);
		console.log('CollectionEphemeraPage', item);
		return (
			<div className="CollectionEphemeraPage">
				<ScrollToTopOnMount />
				<CollectionItemHeader
					{...item}
					collectionItems={collectionItems}
				/>
				CollectionEphemeraPage
			</div>
		);
	}
}

export default CollectionEphemeraPage;
