import React from 'react';

const CollectionContext = React.createContext({
	searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera',
	viewMode: 'tile',
	isCollapsedNav: false,
	changeViewMode: () => {}
});

export default CollectionContext;