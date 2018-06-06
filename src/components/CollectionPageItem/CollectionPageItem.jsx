import React from 'react';

import CollectionPageHome from '../CollectionPageHome/CollectionPageHome';

const CollectionPageItem = ({ match }) => {
	return 'CollectionPageItem ' + match.params.item;
};

export default CollectionPageItem;