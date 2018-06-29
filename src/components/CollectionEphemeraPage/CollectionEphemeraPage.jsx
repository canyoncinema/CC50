import React, { Component } from 'react';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

class CollectionEphemeraPage extends Component {
	render() {
		const { collectionItems, itemId } = this.props;
		return (
			<div className="CollectionEphemeraPage">
				<ScrollToTopOnMount />
				CollectionEphemeraPage
			</div>
		);
	}
}

export default CollectionEphemeraPage;
