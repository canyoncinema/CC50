import React from 'react';

const CollectionContext = React.createContext({
	searchPlaceholder: 'Search films, filmmakers, curated programs, ephemera',
	searchLabel: 'All',
	searchText: '',
	isCollapsedNav: false,
	viewMode: 'tile',
	setViewMode: () => {},
	onOptionSelect: () => {}
});

export default CollectionContext;